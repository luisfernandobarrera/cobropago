from django.db import models
from django.utils.translation import ugettext as _
from decimal import Decimal
from common.models import CommonModel


class Ledger(CommonModel):
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=32, decimal_places=2, default=Decimal('0.00'))

    def get_balance(self):
        if self.accounts.exists():
            return self.accounts.aggregate(total=models.Sum('balance')).get('total', Decimal('0.00'))
        else:
            return Decimal('0.00')

    def set_balance(self):
        if not self._state.adding:
            balance = self.get_balance()
            self.__class__.objects.filter(id=self.id).update(balance=balance)
            self.refresh_from_db()
        else:
            raise ValueError(_('Cannot set balance of unsaved ledger'))


class WithLedgerModel(CommonModel):
    ledger = models.ForeignKey(Ledger, related_name="%(class)ss")

    class Meta:
        abstract = True
        unique_together = (('user', 'ledger', 'name'),)
        index_together = (('user', 'ledger', 'name'),)

    def save(self, *args, **kwargs):
        self.user = self.ledger.user
        super(WithLedgerModel, self).save(*args, **kwargs)


class Account(WithLedgerModel):
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=32, decimal_places=2, default=Decimal('0.00'))

    def get_balance(self):
        if self.transactions.exists():
            return self.transactions.aggregate(total=models.Sum('amount')).get('total', Decimal('0.00'))
        else:
            return Decimal('0.00')

    def set_balance(self):
        if not self._state.adding:
            balance = self.get_balance()
            self.__class__.objects.filter(id=self.id).update(balance=balance)
            self.refresh_from_db()
        else:
            raise ValueError(_('Cannot set balance of unsaved account'))


class Payee(WithLedgerModel):
    name = models.CharField(max_length=300)




class Transaction(WithLedgerModel):
    date = models.DateField(db_index=True)
    check = models.CharField(max_length=30, blank=True)
    account = models.ForeignKey(Account, related_name='transactions')
    payee = models.ForeignKey(Payee, related_name='transactions')
    memo = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=30, decimal_places=2)

    class Meta(CommonModel.Meta):
        unique_together = ()
        index_together = (('user', 'ledger', 'account'),
                          ('user', 'ledger', 'payee'),
                          ('user', 'ledger', 'account', 'payee'))

    def save(self, *args, **kwargs):
        if not (self.account.ledger == self.ledger):
            raise ValueError(_("The account does not belong to the ledger"))
        if not (self.payee.ledger == self.ledger):
            raise ValueError(_("The payee does not belong to the ledger"))
        super(Transaction, self).save(*args, **kwargs)

    def __str__(self):
        return self.memo

