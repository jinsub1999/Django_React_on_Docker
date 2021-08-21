# FROM node

# WORKDIR /front_end
# COPY /frontend/. /front_end
# RUN yarn

FROM python:3.8.11

WORKDIR /back_end
COPY /server/. .
COPY .env.local ../
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python3", "./manage.py", "runserver" , "0:8000"]
EXPOSE 8000

# docker run --name my_sql_name -e MYSQL_ROOT_PASSWORD=###### -d mysql:8.0
# docker build . -t ####/django_docker   
# docker run -p 8000:8000 --name django_backend_latest -t ####/django_docker