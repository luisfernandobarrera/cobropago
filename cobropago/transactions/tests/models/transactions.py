from django.test import TestCase
from django.utils import timezone
from transactions.models import Ledger, Account, Payee, Transaction
from users.models import User
from nose.tools import ok_
from decimal import Decimal


class TransactionValidationTest(TestCase):
    def setUp(self):
        self.user = User(username='test_user')
        self.user.save()
        self.ledger1 = Ledger(user=self.user, name='ledger1')
        self.ledger1.save()
        self.ledger2 = Ledger(user=self.user, name='ledger2')
        self.ledger2.save()

    def test_accountvalidation(self):
        transaction = Transaction()
        transaction.ledger = self.ledger1
        account, _ = Account.objects.get_or_create(name='account', ledger=self.ledger1)
        transaction.account = account
        payee, _ = Payee.objects.get_or_create(name='payee', ledger=self.ledger1)
        transaction.payee = payee
        transaction.date = timezone.now()
        transaction.amount = Decimal('1000')

        self.assertIsNone(transaction.save())

        transaction = Transaction()
        transaction.ledger = self.ledger1
        account, _ = Account.objects.get_or_create(name='account', ledger=self.ledger2)
        transaction.account = account
        payee, _ = Payee.objects.get_or_create(name='payee', ledger=self.ledger1)
        transaction.payee = payee
        transaction.date = timezone.now()
        transaction.amount = Decimal('1000')

        with self.assertRaises(ValueError):
            transaction.save()

    def test_payeevalidation(self):
        transaction = Transaction()
        transaction.ledger = self.ledger1
        account, _ = Account.objects.get_or_create(name='account', ledger=self.ledger1)
        transaction.account = account
        payee, _ = Payee.objects.get_or_create(name='payee', ledger=self.ledger1)
        transaction.payee = payee
        transaction.date = timezone.now()
        transaction.amount = Decimal('1000')
        self.assertIsNone(transaction.save())

        transaction = Transaction()
        transaction.ledger = self.ledger1
        account, _ = Account.objects.get_or_create(name='account', ledger=self.ledger1)
        transaction.account = account
        payee, _ = Payee.objects.get_or_create(name='payee', ledger=self.ledger2)
        transaction.payee = payee
        transaction.date = timezone.now()
        transaction.amount = Decimal('1000')

        with self.assertRaises(ValueError):
            transaction.save()

    def test_name(self):
        transaction = Transaction()
        transaction.ledger = self.ledger1
        account, _ = Account.objects.get_or_create(name='account', ledger=self.ledger1)
        transaction.account = account
        payee, _ = Payee.objects.get_or_create(name='payee', ledger=self.ledger1)
        transaction.payee = payee
        transaction.date = timezone.now()
        transaction.amount = Decimal('1000')
        transaction.save()
        self.assertEqual(str(transaction), transaction.memo)
