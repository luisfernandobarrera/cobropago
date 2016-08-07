from django.core.urlresolvers import reverse
from django.test import TestCase
from django.http import HttpRequest
from django.test.client import RequestFactory
from web.views import HomePageView


class HomePageTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_resolvepage(self):
        request = self.factory.get('/')
        response = HomePageView.as_view()(request)
        self.assertEqual(response.status_code, 200)

