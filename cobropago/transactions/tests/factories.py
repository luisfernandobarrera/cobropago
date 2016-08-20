import uuid
import factory
from users.test.factories import UserFactory


class PayeeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'transactions.Payee'
        django_get_or_create = ('name', 'ledger', 'user')

    id = factory.Sequence(lambda n: uuid.uuid4())
    name = factory.Faker('name')


class LedgerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'transactions.Ledger'
        django_get_or_create = ('name',)

    id = factory.Sequence(lambda n: uuid.uuid4())
    name = factory.Faker('name')
