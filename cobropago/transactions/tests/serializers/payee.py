from django.test import TestCase
from django.forms.models import model_to_dict
from nose.tools import eq_, ok_
from ...serializers import PayeeSerializer
from ..factories import PayeeFactory, LedgerFactory
from users.test.factories import UserFactory


class PayeeSerializerTest(TestCase):
    def setUp(self):
        user = UserFactory.build()
        user.save()
        self.user = user
        ledger = LedgerFactory.build()
        ledger.user = user
        ledger.save()
        self.ledger = ledger
        self.payee_data = model_to_dict(PayeeFactory.build())

    def test_serializer_with_empty_data(self):
        serializer = PayeeSerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_serializer_with_valid_data(self):
        serializer = PayeeSerializer(data=self.payee_data)
        ok_(serializer.is_valid())

    def test_save(self):
        serializer = PayeeSerializer(data=self.payee_data)
        ok_(serializer.is_valid())
        payee = serializer.save(ledger=self.ledger, user=self.user)
        ok_(str(payee))
        ok_(str(payee.name))





