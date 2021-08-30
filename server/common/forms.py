
from django.forms import fields
from django.forms import widgets
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms.widgets import PasswordInput

from.models import UserCustomizableInfo


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "password1", "password2")


class UserLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=PasswordInput)


class UserCIUploadForm(forms.ModelForm):
    class Meta:
        model = UserCustomizableInfo
        fields = ["profile_img"]
        widgets = {
            "profile_img": forms.FileInput()
        }
