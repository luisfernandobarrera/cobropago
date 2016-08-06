#!/usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers

from .models import Account, Payee, Transaction


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name', 'balance')
        read_only_fields = ('balance',)


class PayeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payee
        fields = ('id', 'name')

    def create(self, validated_data):
        name = validated_data.pop('name')
        user = validated_data.pop('user')
        instance, _ = Payee.objects.get_or_create(name=name, user=user, defaults=validated_data)
        return instance


class TransactionSerializer(serializers.ModelSerializer):
    payee = PayeeSerializer()

    def get_fields(self):
        fields = super(TransactionSerializer, self).get_fields()
        fields['payee'].queryset = Payee.objects.filter(user=self.context['view'].request.user)
        fields['account'].queryset = Account.objects.filter(user=self.context['view'].request.user)
        return fields

    def create(self, validated_data):
        payee_serializer = validated_data.pop('payee')
        payee_name = payee_serializer.pop('name')
        user = validated_data['user']
        payee, _ = Payee.objects.get_or_create(name=payee_name, user=user,
                                                defaults=payee_serializer)

        validated_data['payee'] = payee
        instance = Transaction.objects.create(**validated_data)
        return instance

    class Meta:
        model = Transaction
        fields = ('id', 'date', 'account', 'memo', 'amount', 'payee', 'user')
        read_only_fields = ('user',)

