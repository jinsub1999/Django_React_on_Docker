from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import redirect, get_list_or_404
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
        print(req.headers["Origin"])
        form = ProductForm(req.POST)
        if form.is_valid():
            prod = form.save(commit=False)
            prod.added_date = timezone.now()
            prod.save()
            return redirect(origin)

        else:
            errOrigin: str = origin
            errOrigin += "/products?"
            for (k, v) in form.errors.as_data().items():
                for (idx, _v) in enumerate(v):
                    errOrigin += "{0}{1}={2}&".format(
                        k, "ERR",
                        _v.message.encode("utf8").decode("utf8"))
            if errOrigin.endswith("&"):
                errOrigin = errOrigin[:-1]
            print(errOrigin)
            return redirect(errOrigin)

    else:
        print("??? / ", timezone.now())
        return HttpResponse("??? /", )


@ensure_csrf_cookie
def detail(req, product_id):

    if req.method == "GET":
        return HttpResponse("GET /{0}".format(product_id))
    elif req.method == "POST":
        return HttpResponse("POST /{0}".format(product_id))
    else:
        return HttpResponse("??? /{0}".format(product_id))


def productList(req):
    if req.method == "GET":
        ret = {"data": []}
        for elem in get_list_or_404(Product):
            d = {
                "id": elem.id,
                "name": elem.name,
                "price": elem.price,
                "description": elem.description,
                "added_date": elem.added_date,
            }
            ret["data"].append(d)
        return JsonResponse(data=ret)
