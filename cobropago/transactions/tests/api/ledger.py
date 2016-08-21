from django.core.urlresolvers import reverse
from django.forms.models import model_to_dict
from nose.tools import ok_, eq_
from rest_framework.test import APITestCase
from faker import Faker
from users.test.factories import UserFactory
from ..factories import LedgerFactory
from ..models import Ledger

fake = Faker()


class TestLedgerAPI(APITestCase):
    """
    Tests the /ledgers endpoint.
    """

    def setUp(self):
        self.url = reverse('ledger-list')
        self.user = UserFactory.build()
        self.user.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))
        self.ledger_data = model_to_dict(LedgerFactory.build())

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, 400)

    def test_create_ledger(self):
        response = self.client.post(self.url, self.ledger_data)
        eq_(response.status_code, 201)


class TestLedgerDetailAPI(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        self.user.save()
        self.ledger = LedgerFactory.build()
        self.ledger.user = self.user
        self.ledger.save()
        self.url = reverse('ledger-detail', kwargs={'pk': self.ledger.pk})
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))

    def test_get_request_returns_ledger(self):
        response = self.client.get(self.url)
        eq_(response.status_code, 200)

    def test_put_request_updates_a_ledger(self):
        new_name = fake.name()
        payload = {'name': new_name}
        response = self.client.put(self.url, payload)
        eq_(response.status_code, 200)

        ledger = Ledger.objects.get(pk=self.ledger.id)
        eq_(ledger.name, new_name)
