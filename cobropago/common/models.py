#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.db import models
from django.conf import settings
import uuid

class WithUsernameModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    class Meta:
        abstract = True
        unique_together = (('user', 'name'),)
        index_together = (('user', 'name'),)
