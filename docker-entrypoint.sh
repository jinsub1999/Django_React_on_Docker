#!/bin/bash

dockerize -wait tcp://db:3306 -timeout 25s

python ./manage.py migrate
python ./manage.py runserver 0:8000