from rest_framework import viewsets, mixins, filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from common.mixins import ShowOnlyUserObjectsMixin, CreateModelWithUserMixin
from .models import Account, Payee, Transaction
from .serializers import AccountSerializer, PayeeSerializer, TransactionSerializer


class AccountViewSet(ShowOnlyUserObjectsMixin,
                     CreateModelWithUserMixin,
                     viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()


class PayeeViewSet(ShowOnlyUserObjectsMixin,
                   CreateModelWithUserMixin,
                   viewsets.ModelViewSet):
    serializer_class = PayeeSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Payee.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)



