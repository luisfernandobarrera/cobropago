#cobropago
[ ![Codeship Status for joyinsky/cobropago](https://codeship.com/projects/91cfdef0-e25a-0133-0406-0229a9d1976f/status?branch=master)](https://codeship.com/projects/145598)

A simple but powerful income and expense administrator.. Check out the project's [documentation](http://joyinsky.github.io/cobropago/).

# Initialize the project
Create and activate a virtualenv:

```bash
virtualenv env
source env/bin/activate
```
Install dependencies:

```bash
pip install -r requirements.txt
```
Create the database:

```bash
createdb cobropago
```
Initialize the git repository

```
git init
git remote add origin git@github.com:joyinsky/cobropago.git
```

Migrate the database and create a superuser:
```bash
python cobropago/manage.py migrate
python cobropago/manage.py createsuperuser
```

Run the development server: 
```bash
python cobropago/manage.py runserver
```
