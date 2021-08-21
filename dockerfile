# FROM node

# WORKDIR /front_end
# COPY /frontend/. /front_end
# RUN yarn

FROM python

WORKDIR /back_end
COPY /server/. .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python3", "./manage.py", "runserver"]
