import uuid
import factory
import random
import datetime


class AccountFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'transactions.Account'
        django_get_or_create = ('name', 'ledger', 'user')

    id = factory.Sequence(lambda n: uuid.uuid4())
    name = factory.Faker('name')


class PayeeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'transactions.Payee'
        django_get_or_create = ('name', 'ledger', 'user')

    id = factory.Sequence(lambda n: uuid.uuid4())
    name = factory.Faker('company')


class LedgerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'transactions.Ledger'
        django_get_or_create = ('name',)

    id = factory.Sequence(lambda n: uuid.uuid4())
    name = factory.Faker('name')


class TransactionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'transactions.Transaction'
        django_get_or_create = ('name', 'ledger', 'account', 'payee')

    id = factory.Sequence(lambda n: uuid.uuid4())
    date = factory.Faker('date')
    check = factory.Sequence(lambda n: "CHK" + str(n * 100 + 1))
    amount = factory.Sequence(lambda n: random.randint(-1000000, 1000000) / 100)
    memo = factory.Faker('text')
    payee = factory.SubFactory(PayeeFactory)
    account = factory.SubFactory(AccountFactory)
