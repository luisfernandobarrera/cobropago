from django.core.urlresolvers import reverse
from django.forms.models import model_to_dict
from nose.tools import ok_, eq_
from rest_framework.test import APITestCase
from faker import Faker
from users.test.factories import UserFactory
from ..factories import LedgerFactory, AccountFactory, PayeeFactory, TransactionFactory
from ..models import Transaction

fake = Faker()


class TestTransactionAPI(APITestCase):
    """
    Tests the /transactions endpoint.
    """

    def setUp(self):
        self.user = UserFactory.build()
        self.user.save()
        self.ledger = LedgerFactory.build()
        self.ledger.user = self.user
        self.ledger.save()
        self.account = AccountFactory.build()
        self.account.ledger = self.ledger
        self.account.save()
        self.payee = PayeeFactory.build()
        self.payee.ledger = self.ledger
        self.payee.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))
        self.url = reverse('transactions-list', kwargs={'ledger_pk': self.ledger.pk})
        transaction = TransactionFactory.build()
        transaction.account = self.account
        self.transaction_data = model_to_dict(transaction)

    def test_post_request_with_no_data_fails(self):
        response = self.client.post(self.url, {})
        eq_(response.status_code, 400)

    def test_create_transaction(self):
        obj = self.transaction_data.copy()
        obj['payee'] = {}
        obj['payee']['name'] = self.payee.name
        response = self.client.post(self.url, obj, format='json')
        print(response.__dict__)
        eq_(response.status_code, 201)


class TestTransactionDetailAPI(APITestCase):
    def setUp(self):
        self.user = UserFactory.build()
        self.user.save()
        self.ledger = LedgerFactory.build()
        self.ledger.user = self.user
        self.ledger.save()
        self.account = AccountFactory.build()
        self.account.ledger = self.ledger
        self.account.save()
        self.payee = PayeeFactory.build()
        self.payee.ledger = self.ledger
        self.payee.save()
        self.transaction = TransactionFactory.build()
        self.transaction.ledger = self.ledger
        self.transaction.account = self.account
        self.transaction.payee = self.payee
        self.transaction.save()
        self.url = reverse('transaction-detail', kwargs={'pk': self.transaction.pk})
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user.auth_token))

    def test_get_request_returns_transaction(self):
        response = self.client.get(self.url)
        eq_(response.status_code, 200)

    def test_put_request_updates_a_transaction(self):
        new_memo = fake.text()
        payload = {'memo': new_memo}
        response = self.client.patch(self.url, payload, format='json')
        eq_(response.status_code, 200)

        transaction = Transaction.objects.get(pk=self.transaction.id)
        eq_(transaction.memo, new_memo)
