from . import views
from django.urls import path

app_name = "products"

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:product_id>/", views.detail, name="detail"),
]
