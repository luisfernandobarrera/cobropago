from fabric.api import local, run


def test():
    local('python manage.py test')
    local('coverage xml')
    local('coverage html')
