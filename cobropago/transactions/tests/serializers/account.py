from decimal import Decimal
from django.test import TestCase
from django.forms.models import model_to_dict
from nose.tools import eq_, ok_
from ...serializers import AccountSerializer
from ..factories import LedgerFactory, AccountFactory
from users.test.factories import UserFactory


class AccountSerializerTest(TestCase):
    def setUp(self):
        user = UserFactory.build()
        user.save()
        self.user = user
        ledger = LedgerFactory.build()
        ledger.user = user
        ledger.save()
        self.ledger = ledger
        self.account_data = model_to_dict(AccountFactory.build())

    def test_serializer_with_empty_data(self):
        serializer = AccountSerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_serializer_with_valid_data(self):
        serializer = AccountSerializer(data=self.account_data)
        ok_(serializer.is_valid())

    def test_save(self):
        serializer = AccountSerializer(data=self.account_data)
        ok_(serializer.is_valid())
        account = serializer.save(ledger=self.ledger, user=self.user)
        ok_(str(account))
        ok_(str(account.name))

    def test_balance(self):
        serializer = AccountSerializer(data=self.account_data)
        ok_(serializer.is_valid())
        account = serializer.save(ledger=self.ledger, user=self.user)
        eq_(account.balance, Decimal('0.00'))
        account.set_balance()
        eq_(account.balance, Decimal('0.00'))
        eq_(account.get_balance(), Decimal('0.00'))




