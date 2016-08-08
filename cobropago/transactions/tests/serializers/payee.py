from django.test import TestCase
from django.forms.models import model_to_dict
from nose.tools import eq_, ok_
from ...serializers import PayeeSerializer
from ..factories import PayeeFactory


class PayeeSerializerTest(TestCase):
    def setUp(self):
        self.payee_data = model_to_dict(PayeeFactory.build())

    def test_serializer_with_empty_data(self):
        serializer = PayeeSerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_serializer_with_valid_data(self):
        serializer = PayeeSerializer(data=self.payee_data)
        ok_(serializer.is_valid())

    def test_equalPayee(self):
        #serializer = PayeeSerializer(data=self.payee_data)
        #ok_(serializer.is_valid())

        #payee = serializer.save()
        pass


