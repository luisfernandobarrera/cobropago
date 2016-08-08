from django.test import TestCase
from django.forms.models import model_to_dict
from nose.tools import eq_, ok_
from ...serializers import LedgerSerializer
from ..factories import LedgerFactory


class LedgerSerializerTest(TestCase):
    def setUp(self):
        self.ledger_data = model_to_dict(LedgerFactory.build())

    def test_serializer_with_empty_data(self):
        serializer = LedgerSerializer(data={})
        eq_(serializer.is_valid(), False)

    def test_serializer_with_valid_data(self):
        serializer = LedgerSerializer(data=self.ledger_data)
        ok_(serializer.is_valid())

    def test_serializer_save(self):
        pass

