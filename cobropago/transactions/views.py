from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from common.mixins import ShowOnlyUserObjectsMixin, CreateModelWithUserMixin
from .models import Account, Payee, Transaction
from .serializers import AccountSerializer, PayeeSerializer, TransactionSerializer


class AccountViewSet(ShowOnlyUserObjectsMixin,
                     CreateModelWithUserMixin,
                     mixins.RetrieveModelMixin,
                     mixins.ListModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    """
    Retrieves an Account
    """
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Account.objects.all()

