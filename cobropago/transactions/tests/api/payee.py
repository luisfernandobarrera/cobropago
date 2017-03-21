from django.core.urlresolvers import reverse
from django.forms.models import model_to_dict
from nose.tools import ok_, eq_
from rest_framework.test import APITestCase
from faker import Faker
from users.test.factories import UserFactory
from ..factories import LedgerFactory, PayeeFactory
from ..models import Payee

fake = Faker()


class TestPayeeAPI(APITestCase):
    """
    Tests the /accounts endpoint.
    """

    def setUp(self):
        self.user = UserFactory.build()
        self.user.save()
        self.ledger = LedgerFactory.build()
        self.ledger.user = self.user
        self.ledger.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))
        self.url = reverse('payees-list', kwargs={'ledger_pk': self.ledger.pk})
        self.payee_data = model_to_dict(PayeeFactory.build())

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, 400)

    def test_create_payee(self):
        response = self.client.post(self.url, self.payee_data)
        eq_(response.status_code, 201)


class TestPayeeDetailAPI(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        self.user.save()
        self.ledger = LedgerFactory.build()
        self.ledger.user = self.user
        self.ledger.save()
        self.payee = PayeeFactory.build()
        self.payee.ledger = self.ledger
        self.payee.save()
        self.url = reverse('payee-detail', kwargs={'pk': self.payee.pk})
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))

    def test_get_request_returns_payee(self):
        response = self.client.get(self.url)
        eq_(response.status_code, 200)

    def test_put_request_updates_a_payee(self):
        new_name = fake.name()
        payload = {'name': new_name}
        response = self.client.put(self.url, payload)
        eq_(response.status_code, 200)

        payee = Payee.objects.get(pk=self.payee.id)
        eq_(payee.name, new_name)

    def test_put_request_updates_a_payee_with_spaces(self):
        new_name = "   " + fake.name() + "     "
        payload = {'name': new_name}
        response = self.client.put(self.url, payload)
        eq_(response.status_code, 200)

        payee = Payee.objects.get(pk=self.payee.id)
        eq_(payee.name, new_name.strip())
