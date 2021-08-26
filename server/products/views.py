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
        origin = req.headers["Origin"]
        origin += "/products?"
        form = ProductForm(req.POST)
        if form.is_valid():
            prod = form.save(commit=False)
            prod.added_date = timezone.now()
            prod.save()
            return HttpResponse("OK")

        else:
            ret = {"errs": []}
            errOrigin: str = origin
            for (k, v) in form.errors.as_data().items():
                for (idx, _v) in enumerate(v):
                    ret["errs"].append(
                        {"errName": k+"ERR", "errDescription": _v.message})
                    errOrigin += "{0}{1}={2}&".format(
                        k, "ERR",
                        _v.message.encode("utf8").decode("utf8"))
            if errOrigin.endswith("&"):
                errOrigin = errOrigin[:-1]
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
