from django.contrib.auth import views as auth_views
from . import views
from django.urls import path

app_name = "common"

urlpatterns = [
    path("login/", views.login , name="login"),
    path("get_csrf/", views.get_csrf , name="get_csrf"),
    path("get_user/", views.get_user, name="get_user"),
    path("logout/", views.logout, name="logout"),
    path("signup/", views.signup, name="signup"),
]
