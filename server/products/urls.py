from . import views
from django.urls import path

app_name = "products"

urlpatterns = [
    path("", views.index, name="index"),
    path("del/<int:product_id>/", views.productRemove, name="productRemove"),
    path("modify/<int:product_id>/", views.productModify, name="productModify"),
    path("<int:product_id>/", views.detail, name="detail"),
    path("productList/", views.productList, name="productList"),
    path("vote/<int:product_id>/<int:vote_val>/",
         views.vote, name="productVote"),
]
