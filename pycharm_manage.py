from manage import *

if sys.argv[0] and sys.argv[0].find('django_test_manage.py'):
    import configurations
    configurations.setup()
