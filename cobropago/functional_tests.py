#!/usr/bin/env python
# -*- coding: utf-8 -*-
import unittest
from selenium import webdriver

class HomePageTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()

    def tearDown(self):
        self.browser.close()

    def test_home_page(self):
        self.browser.get("http://localhost:8000")
        self.assertIn('Django', self.browser.title)


if __name__ == '__main__':
    unittest.main()