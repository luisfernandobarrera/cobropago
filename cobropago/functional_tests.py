#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.test import TestCase
from selenium import webdriver


class HomePageTest(TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.close()

    def test_home_page(self):
        self.browser.get("http://localhost:8000")
        self.assertIn('Django', self.browser.title)


