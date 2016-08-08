#!/usr/bin/env python
# -*- coding: utf-8 -*-
import unittest
from selenium import webdriver


class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_home_page(self):
        self.browser.get("http://localhost:8000/")
        header = self.browser.find_element_by_tag_name('h1')
        self.assertIn(header.text, 'cobropago')


if __name__ == '__main__':
    unittest.main()

