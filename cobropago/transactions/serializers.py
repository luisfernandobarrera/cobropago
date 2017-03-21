#!/usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers

from .models import Ledger, Account, Payee, Transaction


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name', 'balance', 'ledger')
        read_only_fields = ('balance', 'ledger')


class PayeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payee
        fields = ('id', 'name', 'ledger')
        read_only_fields = ('ledger',)

    def create(self, validated_data):
        name = validated_data.pop('name')
        user = validated_data.pop('user')
        instance, _ = Payee.objects.get_or_create(name=name, user=user, defaults=validated_data)
        return instance

    def validate_name(self, name):
        return name.strip()


class TransactionSerializer(serializers.ModelSerializer):
    payee = PayeeSerializer()

    def get_fields(self):
        fields = super(TransactionSerializer, self).get_fields()
        ledger = self.context['view'].kwargs.get('ledger_pk')
        if not ledger:
            if self.instance:
                ledger = self.instance.ledger.pk
        fields['payee'].queryset = Payee.objects.filter(user=self.context['view'].request.user)\
            .filter(ledger_id=ledger)
        fields['account'].queryset = Account.objects.filter(user=self.context['view'].request.user)\
            .filter(ledger_id=ledger)

        return fields

    def create(self, validated_data):
        payee_serializer = validated_data.pop('payee')
        payee_name = payee_serializer.pop('name')

        ledger = self.context['view'].kwargs.get('ledger_pk')
        if not ledger:
            if self.instance:
                ledger = self.instance.ledger.pk

        payee, _ = Payee.objects.get_or_create(name=payee_name, ledger_id=ledger, defaults=payee_serializer)
        validated_data['payee'] = payee

        instance = Transaction.objects.create(**validated_data)
        return instance

    class Meta:
        model = Transaction
        fields = ('id', 'date', 'account', 'memo', 'amount', 'payee', 'user', 'ledger')
        read_only_fields = ('user', 'ledger')


class LedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ledger
        fields = ('id', 'name', 'balance')
        read_only_fields = ('balance',)


class LedgerDetailSerializer(LedgerSerializer):
    accounts = AccountSerializer(many=True)

    class Meta(LedgerSerializer.Meta):
        fields = ('id', 'name', 'accounts', 'balance')
