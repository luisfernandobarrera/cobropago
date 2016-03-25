from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
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




