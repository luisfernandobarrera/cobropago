#!/usr/bin/env python
import os
import sys


pwd = os.path.dirname(__file__)
sys.path.insert(0, os.path.abspath(os.path.join(pwd, 'cobropago')))

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config")
    os.environ.setdefault("DJANGO_CONFIGURATION", "Local")

    from configurations.management import execute_from_command_line

    execute_from_command_line(sys.argv)
