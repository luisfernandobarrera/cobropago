#!/usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers

from .models import Account, Payee, Transaction


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name')
        read_only_fields = ('balance',)


class PayeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payee
        field = ('id', 'name')
        read_only_field = ('username',)


class TransactionSerializer(serializers.ModelSerializer):
    payee = PayeeSerializer()

    class Meta:
        model = Transaction
        fields = ('id', 'date', 'account', 'meme', 'amount')
        read_only_field = ('username',)
