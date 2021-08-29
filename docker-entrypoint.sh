dockerize -wait tcp://db:3306 -timeout 40s

python ./manage.py makemigrations
python ./manage.py migrate
python ./manage.py runserver 0:8000