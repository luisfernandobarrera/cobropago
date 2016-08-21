from rest_framework import viewsets, filters
from rest_framework.mixins import (RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin,
                                   ListModelMixin, CreateModelMixin)
from rest_framework.permissions import IsAuthenticated
from common.mixins import ShowOnlyUserObjectsMixin, CreateModelWithUserMixin, NestedLedgerMixin
from .models import Ledger, Account, Payee, Transaction
from .serializers import (LedgerSerializer, LedgerDetailSerializer,
                          AccountSerializer, PayeeSerializer, TransactionSerializer)


class LedgerViewSet(ShowOnlyUserObjectsMixin,
                    CreateModelWithUserMixin,
                    viewsets.ModelViewSet):
    serializer_class = LedgerSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Ledger.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LedgerDetailSerializer
        else:
            return LedgerSerializer


class AccountViewSet(ShowOnlyUserObjectsMixin,
                     RetrieveModelMixin,
                     UpdateModelMixin,
                     DestroyModelMixin,
                     viewsets.GenericViewSet):
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()


class NestedAccountViewSet(NestedLedgerMixin,
                           CreateModelMixin,
                           ListModelMixin,
                           viewsets.GenericViewSet):
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()


class PayeeViewSet(ShowOnlyUserObjectsMixin,
                   RetrieveModelMixin,
                   UpdateModelMixin,
                   DestroyModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = PayeeSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Payee.objects.all()


class NestedPayeeViewSet(NestedLedgerMixin,
                         CreateModelMixin,
                         ListModelMixin,
                         viewsets.GenericViewSet):
    serializer_class = PayeeSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Payee.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)


class TransactionViewSet(ShowOnlyUserObjectsMixin,
                         RetrieveModelMixin,
                         UpdateModelMixin,
                         DestroyModelMixin,
                         viewsets.GenericViewSet):
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Transaction.objects.all()


class NestedTransactionViewSet(NestedLedgerMixin,
                               CreateModelMixin,
                               ListModelMixin,
                               viewsets.GenericViewSet):
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Transaction.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('date', 'memo', 'payee__name')
