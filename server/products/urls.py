from . import views
from django.urls import path

app_name = "products"

urlpatterns = [
    path("", views.index, name="index"),
    path("del/<int:product_id>/", views.productRemove, name="productRemove"),
    path("<int:product_id>/", views.detail, name="detail"),
    path("productList/", views.productList, name="productList"),
]
