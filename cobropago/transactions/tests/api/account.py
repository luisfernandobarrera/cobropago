from django.core.urlresolvers import reverse
from django.forms.models import model_to_dict
from nose.tools import ok_, eq_
from rest_framework.test import APITestCase
from faker import Faker
from users.test.factories import UserFactory
from ..factories import LedgerFactory, AccountFactory
from ..models import Account

fake = Faker()


class TestAccountAPI(APITestCase):
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
        self.url = reverse('accounts-list', kwargs={'ledger_pk': self.ledger.pk})
        self.account_data = model_to_dict(AccountFactory.build())

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, 400)

    def test_create_account(self):
        response = self.client.post(self.url, self.account_data)
        eq_(response.status_code, 201)


class TestAccountDetailAPI(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        self.user.save()
        self.ledger = LedgerFactory.build()
        self.ledger.user = self.user
        self.ledger.save()
        self.account = AccountFactory.build()
        self.account.ledger = self.ledger
        self.account.save()
        self.url = reverse('account-detail', kwargs={'pk': self.account.pk})
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))

    def test_get_request_returns_account(self):
        response = self.client.get(self.url)
        eq_(response.status_code, 200)

    def test_put_request_updates_a_account(self):
        new_name = fake.name()
        payload = {'name': new_name}
        response = self.client.put(self.url, payload)
        eq_(response.status_code, 200)

        account = Account.objects.get(pk=self.account.id)
        eq_(account.name, new_name)
