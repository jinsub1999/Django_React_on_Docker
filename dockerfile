# FROM node

# WORKDIR /front_end
# COPY /frontend/. /front_end
# RUN yarn

FROM python:3.8.11

COPY docker-entrypoint.sh .
RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /back_end
COPY /server/. .
COPY .env ../
RUN pip install --no-cache-dir -r requirements.txt

RUN chmod +x ../docker-entrypoint.sh
ENTRYPOINT ../docker-entrypoint.sh
EXPOSE 8000

# docker run --name my_sql_name -e MYSQL_ROOT_PASSWORD=###### -d mysql:8.0
# docker build . -t ####/django_docker   
# docker run -p 8000:8000 --name django_backend_latest -t ####/django_docker