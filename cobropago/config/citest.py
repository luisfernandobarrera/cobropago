from .test import Test
from configurations import values


class CITest(Test):
    DATABASES = values.DatabaseURLValue('postgres://localhost:5435/cobropago')
