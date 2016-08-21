from django.test import TestCase
from django.utils import timezone
from transactions.models import Ledger, Account, Payee, Transaction
from users.test.factories import UserFactory
from decimal import Decimal


class LedgerModelTest(TestCase):
    def setUp(self):
        ledger = Ledger()
        user1 = UserFactory.build()
        user1.save()
        ledger.user = user1
        ledger.name = 'Test Ledger'
        ledger.save()
        self.ledger = ledger

    def test_save_and_retrieve(self):
        self.assertEqual(self.ledger.user.ledgers.count(), 1)
        retrieved_ledger = Ledger.objects.get(user=self.ledger.user, id=self.ledger.id)
        self.assertEqual(retrieved_ledger, self.ledger)

    def test_initialbalance(self):
        self.assertEqual(self.ledger.balance, Decimal('0.00'))
        self.assertEqual(self.ledger.get_balance(), Decimal('0.00'))
        self.ledger.set_balance()
        self.assertEqual(self.ledger.balance, Decimal('0.00'))

    def test_balance(self):
        t = Transaction()
        t.ledger = self.ledger
        t.payee, _ = Payee.objects.get_or_create(name='', ledger=self.ledger)
        t.account, _ = Account.objects.get_or_create(name='Cuenta', ledger=self.ledger)
        t.date = timezone.now()
        t.amount = Decimal('1234.56')
        t.save()

        self.assertEqual(self.ledger.balance, Decimal('1234.56'))
        self.assertEqual(self.ledger.get_balance(), Decimal('1234.56'))
        self.assertEqual(self.ledger.balance, Decimal('1234.56'))
        balance = self.ledger.balance
        self.ledger.set_balance()
        self.assertEqual(self.ledger.balance, balance)
        self.assertEqual(self.ledger.get_balance(), balance)

    def test_unsaved(self):
        l = Ledger()
        self.assertEqual(l.get_balance(), Decimal('0.00'))
        with self.assertRaises(ValueError):
            l.set_balance()

    def test_getbalance(self):
        self.assertEqual(self.ledger.get_balance(), Decimal('0.00'))
        t = Transaction()
        t.ledger = self.ledger
        t.payee, _ = Payee.objects.get_or_create(name='', ledger=self.ledger)
        t.account, _ = Account.objects.get_or_create(name='Cuenta', ledger=self.ledger)
        t.date = timezone.now()
        t.amount = Decimal('1234.56')
        t.save()
        self.assertEqual(self.ledger.get_balance(), Decimal('1234.56'))

    def test_setbalance(self):
        self.assertEqual(self.ledger.balance, Decimal('0.00'))
        self.assertIsNone(self.ledger.set_balance())
        self.assertEqual(self.ledger.balance, Decimal('0.00'))
        t = Transaction()
        t.ledger = self.ledger
        t.payee, _ = Payee.objects.get_or_create(name='', ledger=self.ledger)
        t.account, _ = Account.objects.get_or_create(name='Cuenta', ledger=self.ledger)
        t.date = timezone.now()
        t.amount = Decimal('1234.56')
        t.save()
        self.assertEqual(self.ledger.balance, Decimal('1234.56'))
        self.assertIsNone(self.ledger.set_balance())
        self.assertEqual(self.ledger.balance, Decimal('1234.56'))

    def test_label(self):
        self.assertEqual(self.ledger.__str__(), "Test Ledger")
        self.assertEqual(str(self.ledger), "Test Ledger")



