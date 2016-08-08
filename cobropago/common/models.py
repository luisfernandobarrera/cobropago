#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.db import models
from django.conf import settings
import uuid


class WithTimeStampModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class WithUsernameModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="%(class)ss")

    class Meta:
        abstract = True
        unique_together = (('user', 'name'),)
        index_together = (('user', 'name'),)


class CommonModel(WithUsernameModel, WithTimeStampModel):
    class Meta(WithUsernameModel.Meta, WithTimeStampModel.Meta):
        abstract = True

    def __str__(self):
        return self.name