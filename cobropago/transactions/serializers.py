#!/usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers

from .models import Account, Payee, Transaction


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name')
        read_only_fields = ('balance')


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

    class Meta:
        model = Transaction
        fields = ('id', 'date', 'account', 'meme', 'amount')
        read_only_field = ('username',)
