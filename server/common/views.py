from django.core.files import File
from django.db.models import fields
from django.db.models.fields.files import ImageField, ImageFieldFile
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http.response import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .forms import UserForm, UserLoginForm, UserCIUploadForm
from .models import UserCustomizableInfo

# Create your views here.


@ensure_csrf_cookie
def get_csrf(req):
    if req.method == "GET":
        return HttpResponse()
    else:
        return HttpResponse("Use GET method.")


def get_user(req):
    if req.method == "GET":
        return HttpResponse("{0}".format(req.user))


def profile(req):
    if req.method == "GET":
        if not req.user.is_authenticated:
            return HttpResponse("Login Required")
        else:
            userCI = get_object_or_404(UserCustomizableInfo, pk=req.user.id)
            try:
                return HttpResponse(userCI.profile_img.read(), content_type="image/*")
            except:
                with open("usrData/defaults/defaultimage.jpeg", "rb") as f:
                    return HttpResponse(f.read(), content_type="image/*")
    if req.method == "POST":
        if not req.user.is_authenticated:
            return HttpResponse("Login Required")
        else:
            form = UserCIUploadForm(files=req.FILES)
            if form.is_valid():
                usrCI = form.save(commit=False)
                usrCI.usr = req.user
                usrCI.save()
                return HttpResponse("OK")

            return HttpResponse("Form is not vaild")
    else:
        return HttpResponse("Wrong method.")


def login(req):
    if req.method == "POST":
        form = UserLoginForm(req.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]

            user = authenticate(req, username=username, password=password)
            if user is not None:
                auth_login(req, user)
                return HttpResponse("OK")
            else:
                ret = {"errs": [{"errName": "usernotfoundERR",
                                 "errDescription": "존재하지 않는 사용자이거나 비밀번호가 틀렸습니다."}]}
                return JsonResponse(data=ret)
        else:
            ret = {"errs": []}
            for (k, v) in form.errors.as_data().items():
                for (idx, _v) in enumerate(v):
                    ret["errs"].append(
                        {"errName": k+"ERR", "errDescription": "{0}".format(_v)[2:-2]})
            return JsonResponse(data=ret)
    else:
        return HttpResponse("{0}".format(req.user))


@ login_required(login_url="http://localhost:3000/login")
def logout(req):
    if req.method == "POST":
        auth_logout(req)
        return HttpResponse("LOGOUT")
    else:
        return HttpResponse("Error. Wrong request method ({0}). Use POST.".format(req.method))


def signup(req):
    if req.method == "POST":
        form = UserForm(req.POST)
        if form.is_valid():
            form.save(commit=False)
            username = form.cleaned_data['username']
            raw_password = form.cleaned_data['password1']
            if len(User.objects.filter(username=username)):
                ret = {"errs": [{"errName": "usernameSIGNUPERR",
                                 "errDescription": "{0}은(는) 이미 존재하는 아이디입니다.".format(username)}]}
                return JsonResponse(data=ret)
            else:
                form.save()
                user = authenticate(username=username, password=raw_password)
                UserCustomizableInfo(usr=user).save()
                auth_login(req, user)
                return HttpResponse("SIGNUP")

        else:
            ret = {"errs": []}
            for (k, v) in form.errors.as_data().items():
                for (idx, _v) in enumerate(v):
                    ret["errs"].append(
                        {"errName": k+"SIGNUPERR", "errDescription": "{0}".format(_v)[2:-2]})
                    print(_v)
            return JsonResponse(data=ret)
    else:
        return HttpResponse("Error. Wrong request method ({0}). Use POST.".format(req.method))


def getUserVote(req):
    if req.method == "GET":
        if not req.user.is_authenticated:
            return HttpResponse("Login required")
        ret = {"userUpvotes": [], "userDownvotes": []}
        usr = req.user
        for item in usr.product_upvotes.all():
            d = item.getNonNullValDict()
            d["author_name"] = item.author.username
            ret["userUpvotes"].append(d)

        for item in usr.product_downvotes.all():
            d = item.getNonNullValDict()
            d["author_name"] = item.author.username
            ret["userDownvotes"].append(d)

        return JsonResponse(data=ret)

    else:
        return HttpResponse("Error. Wrong request method ({0}). Use POST.".format(req.method))
