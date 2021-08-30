from os import path
from django.db import models
from django.db.models.base import Model
from django.db.models import ImageField
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField
from django.contrib.auth.models import User
from pathlib import Path

# Create your models here.


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'usrData/user_{0}/{1}'.format(instance.usr.id, filename)


class UserCustomizableInfo(models.Model):
    usr = OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    profile_img = ImageField(null=True, blank=True,
                             upload_to=user_directory_path)

    def __str__(self):
        return "{0}'s info".format(self.usr)
