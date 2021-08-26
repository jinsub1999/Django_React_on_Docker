from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, get_list_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils import timezone
from .models import Product
from .forms import ProductForm

# Create your views here.


@ensure_csrf_cookie
def index(req):
    if req.method == "GET":
        getResponse = HttpResponse()
        return getResponse
    elif req.method == "POST":
        form = ProductForm(req.POST)
        if form.is_valid():
            prod = form.save(commit=False)
            prod.added_date = timezone.now()
            prod.save()
            return HttpResponse("OK")

        else:
            ret = {"errs": []}
            for (k, v) in form.errors.as_data().items():
                for (idx, _v) in enumerate(v):
                    ret["errs"].append(
                        {"errName": k+"ERR", "errDescription": _v.message})
            return JsonResponse(data=ret)

    else:
        print("??? / ", timezone.now())
        return HttpResponse("??? /", )


def detail(req, product_id):
    if req.method == "GET":
        elem = get_object_or_404(Product, pk=product_id)
        ret = {
            "data": {
                "id": elem.id,
                "name": elem.name,
                "price": elem.price,
                "description": elem.description,
                "added_date": elem.added_date,
            }
        }
        if elem.modded_date is not None:
            ret["data"]["modded_date"] = elem.modded_date
        print(ret)
        return JsonResponse(data=ret)
    else:
        return HttpResponse("Request Method is not GET.")


def productList(req):
    if req.method == "GET":
        ret = {"data": []}
        for elem in get_list_or_404(Product.objects.order_by("-added_date")):
            d = {
                "id": elem.id,
                "name": elem.name,
                "price": elem.price,
                "description": elem.description,
                "added_date": elem.added_date,
            }
            if elem.modded_date is not None:
                d["modded_date"] = elem.modded_date
            ret["data"].append(d)
        return JsonResponse(data=ret)
    else:
        return HttpResponse("Request Method is not GET.")


def productRemove(req, product_id):
    if req.method == "POST":
        elem = get_object_or_404(Product, pk=product_id)
        ret = elem.delete()
        return HttpResponse("Deleted")
    else:
        return HttpResponse("Request Method is not POST.")


def productModify(req, product_id):
    if req.method == "POST":
        form = ProductForm(req.POST)
        if form.is_valid():
            originProduct = get_object_or_404(Product, pk=product_id)
            postDict: dict = req.POST.dict()
            originProduct.description = postDict['description']
            originProduct.name = postDict['name']
            originProduct.price = postDict['price']
            originProduct.modded_date = timezone.now()
            originProduct.save()
            return HttpResponse("Modified")

        else:
            ret = {"errs": []}
            for (k, v) in form.errors.as_data().items():
                for (idx, _v) in enumerate(v):
                    ret["errs"].append(
                        {"errName": k+"ERR", "errDescription": _v.message})
            return JsonResponse(data=ret)

    else:
        return HttpResponse("Request Method is not POST.")
