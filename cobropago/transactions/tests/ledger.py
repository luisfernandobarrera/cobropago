from django.test import TestCase
from django.utils import timezone
from transactions.models import Ledger, Account, Payee, Transaction
from users.models import User
from decimal import Decimal


class LedgerModelTest(TestCase):
    def test_save_and_retrieve(self):
        ledger = Ledger()
        user1 = User(username="test_user")
        user1.save()
        ledger.user = user1
        ledger.name = 'Test Ledger'
        ledger.save()
        self.assertEqual(user1.ledgers.count(), 1)
        retrieved_ledger = Ledger.objects.get(user=user1, id=ledger.id)
        self.assertEqual(retrieved_ledger, ledger)

    def test_initialbalance(self):
        ledger = Ledger()
        user1 = User(username="test_user")
        user1.save()
        ledger.user = user1
        ledger.name = 'Test Ledger'
        ledger.save()
        self.assertEqual(ledger.balance, Decimal('0.00'))

    def test_balance(self):
        ledger = Ledger()
        user1 = User(username="test_user")
        user1.save()
        ledger.user = user1
        ledger.name = 'Test Ledger'
        ledger.save()

        t = Transaction()
        t.ledger = ledger
        t.payee, _ = Payee.objects.get_or_create(name='', ledger=ledger)
        t.account, _ = Account.objects.get_or_create(name='Cuenta', ledger=ledger)
        t.date = timezone.now()
        t.amount = Decimal('1234.56')
        t.save()

        self.assertEqual(ledger.balance, Decimal('1234.56'))
