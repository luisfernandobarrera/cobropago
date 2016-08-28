from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.core.urlresolvers import reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView, TemplateView
from rest_framework_nested import routers
from users.views import UserViewSet
from transactions.views import (AccountViewSet, PayeeViewSet, TransactionViewSet, LedgerViewSet,
                                NestedAccountViewSet, NestedPayeeViewSet, NestedTransactionViewSet)
from web.views import HomePageView, mockup_view

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)

router.register(r'ledgers', LedgerViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'payees', PayeeViewSet)
router.register(r'transactions', TransactionViewSet)

ledger_router = routers.NestedSimpleRouter(router, 'ledgers', lookup='ledger', trailing_slash=False)
ledger_router.register(r'accounts', NestedAccountViewSet, base_name='accounts')
ledger_router.register(r'payees', NestedPayeeViewSet, base_name='payees')
ledger_router.register(r'transactions', NestedTransactionViewSet, base_name='transactions')

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include('authentication.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(ledger_router.urls)),
    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    # url(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    url(r'^mockup$', mockup_view),
    url(r'^mockup/(?P<template_name>\w+)$', mockup_view),
    url(r'^$', HomePageView.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
