#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import viewsets, mixins, permissions


class ShowOnlyUserObjectsMixin(object):
    def get_queryset(self):
        user = self.request.user
        queryset = super(ShowOnlyUserObjectsMixin, self).get_queryset()
        return queryset.filter(user=user)


class CreateModelWithUserMixin(mixins.CreateModelMixin):
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

