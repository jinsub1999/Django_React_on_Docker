from .forms import UserForm, UserLoginForm
from django.http.response import HttpResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

# Create your views here.


def get_csrf(req):
    if req.method == "GET":
        return HttpResponse()
    else:
        return HttpResponse("Use GET method.")


def get_user(req):
    if req.method == "GET":
        return HttpResponse("{0}".format(req.user))


def login(req):
    if req.method == "POST":
        form = UserLoginForm(req.POST)
        errMsg = ""
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]

            user = authenticate(req, username=username, password=password)
            if user is not None:
                auth_login(req, user)
                return redirect(req.headers["Origin"])
            else:
                errMsg += "?usernotfoundERR=존재하지 않는 사용자이거나 비밀번호가 틀렸습니다."
                return redirect(req.headers["Origin"] + "/login" + errMsg)
        else:
            errMsg += "?"
            for (k, v) in form.errors.as_data().items():
                print(k, v)
                for (idx, _v) in enumerate(v):
                    errMsg += "{0}{1}={2}&".format(
                        k, "ERR",
                        _v.message.encode("utf8").decode("utf8"))
        if errMsg.endswith("&"):
            errMsg = errMsg[:-1]
        return redirect(req.headers["Origin"] + "/login" + errMsg)
    else:
        return HttpResponse("{0}".format(req.user))


@login_required(login_url="http://localhost:3000/login")
def logout(req):
    if req.method == "POST":
        auth_logout(req)
        return redirect(req.headers["Origin"])
    else:
        return HttpResponse("Error. Wrong request method ({0}). Use POST.".format(req.method))


def signup(req):
    if req.method == "POST":
        form = UserForm(req.POST)
        errMsg = ""
        if form.is_valid():
            form.save(commit=False)
            username = form.cleaned_data['username']
            raw_password = form.cleaned_data['password1']
            if User.objects.get(username=username):
                errMsg += "?usernameSIGNUPERR=이미 존재하는 아이디입니다."
            else:
                user = authenticate(username=username, password=raw_password)
                auth_login(req, user)
                return redirect(req.headers["Origin"])

        else:
            errMsg += "?"
            for (k, v) in form.errors.as_data().items():
                print(k, v)
                for (idx, _v) in enumerate(v):
                    errMsg += "{0}{1}={2}&".format(
                        k, "SIGNUPERR", _v.messages[0])
        if errMsg.endswith("&"):
            errMsg = errMsg[:-1]
        return redirect(req.headers["Origin"] + "/signup" + errMsg)
    else:
        return HttpResponse("Error. Wrong request method ({0}). Use POST.".format(req.method))
