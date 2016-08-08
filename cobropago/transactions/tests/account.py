from django.test import TestCase
from django.utils import timezone
from transactions.models import Ledger, Account, Payee, Transaction
from users.models import User
from decimal import Decimal
import random
import string


class AccountModelTest(TestCase):
    def setUp(self):
        ledger = Ledger()
        user1 = User(username="test_user")
        user1.save()
        ledger.user = user1
        ledger.name = 'Test Ledger'
        ledger.save()
        self.ledger = ledger
        name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
        self.account = Account.objects.create(ledger=self.ledger, name=name)

    def test_balance(self):
        self.assertEqual(self.account.balance, Decimal('0.00'))
        t = Transaction()
        t.ledger = self.ledger
        t.payee, _ = Payee.objects.get_or_create(name='', ledger=self.ledger)
        t.account = self.account
        t.date = timezone.now()
        t.amount = Decimal('1234.56')
        t.save()
        self.assertEqual(self.account.balance, Decimal('1234.56'))

    def test_getbalance(self):
        self.assertEqual(self.account.get_balance(), Decimal('0.00'))
        t = Transaction()
        t.ledger = self.ledger
        t.payee, _ = Payee.objects.get_or_create(name='', ledger=self.ledger)
        t.account = self.account
        t.date = timezone.now()
        t.amount = Decimal('1234.56')
        t.save()
        self.assertEqual(self.account.get_balance(), Decimal('1234.56'))

    def test_unsaved(self):
        a = Account()
        with self.assertRaises(ValueError):
            a.set_balance()
        self.assertEqual(a.get_balance(), Decimal('0.00'))

    def test_setbalance(self):
        self.assertIsNone(self.account.set_balance())
        self.assertEqual(self.account.balance, Decimal('0.00'))
