#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.db.models.signals import post_save, pre_save, pre_delete, post_delete
from django.dispatch import receiver

from .models import Transaction, Account


@receiver(post_save, sender=Transaction)
def update_account_balance(sender, instance=None, **kwargs):
    instance.account.set_balance()