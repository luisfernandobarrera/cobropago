FROM ubuntu:16.04
MAINTAINER Luis Fernando Barrera <luisfernando@informind.com>

ENV POSTGIS_MAJOR 2.3
ENV PG_MAJOR 9.6

RUN apt-get update -y
RUN apt-get install -y curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y apt-utils sudo zsh wget curl sudo vim
RUN apt-get install -y \
      build-essential iptables git mercurial python-dev screen \
      rubygems npm nodejs nodejs-legacy awscli yarn \
      postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR postgresql-plpython-$PG_MAJOR \
      python-psycopg2 python-mysqldb \
      memcached libmemcached-dev libmemcache-dev \
      python-setuptools python-dev python-pgmagick \
      python-pip python-geoip \
      libgeos-c1v5 libgeos-dev libgdal-dev
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/* /var/tmp/*

RUN pip install virtualenv virtualenvwrapper --no-cache-dir

RUN pip install --upgrade pip --no-cache-dir

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code
RUN pip install -r requirements.txt
ADD . /code
RUN python manage.py migrate
