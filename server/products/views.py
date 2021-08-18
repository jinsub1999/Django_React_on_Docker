from django.http.response import HttpResponse
from django.shortcuts import redirect
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
