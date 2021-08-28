from django.db.models.manager import Manager
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, get_list_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.forms.models import model_to_dict
from django.utils import timezone
from .models import Product
from .forms import ProductForm
from django.contrib.auth.models import AnonymousUser

# Create your views here.


@ensure_csrf_cookie
def index(req):
    if req.method == "POST":
        if not req.user.is_authenticated:
            return HttpResponse("Login Required")

        form = ProductForm(req.POST)
        if form.is_valid():
            prod = form.save(commit=False)
            prod.added_date = timezone.now()
            prod.author = req.user
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
        return HttpResponse("Request Method is not POST.")


def detail(req, product_id):
    if req.method == "GET":
        elem = get_object_or_404(Product, pk=product_id)
        elemDict = elem.getNonNullValDict()
        print(elemDict)
        ret = {
            "data": elemDict
        }
        return JsonResponse(data=ret)
    else:
        return HttpResponse("Request Method is not GET.")


def vote(req, product_id, vote_val):
    if req.method == "POST":
        if req.user.is_authenticated:
            target = get_object_or_404(Product, pk=product_id)
            querysetUp = target.upvotes.filter(pk=req.user.id)
            querysetDown = target.downvotes.filter(pk=req.user.id)

            if vote_val == 1:
                if querysetUp.count():
                    target.upvotes.remove(req.user)
                else:
                    target.upvotes.add(req.user)
                    if querysetDown.count():
                        target.downvotes.remove(req.user)

            elif vote_val == 2:
                if querysetDown.count():
                    target.downvotes.remove(req.user)
                else:
                    target.downvotes.add(req.user)
                    if querysetUp.count():
                        target.upvotes.remove(req.user)
            else:
                return HttpResponse("ERROR")
        else:
            return HttpResponse("Login Required")
        return HttpResponse("OK")
    else:

        return HttpResponse("Request Method is not POST.")


def productList(req):
    if req.method == "GET":
        ret = {"data": []}
        for elem in get_list_or_404(Product.objects.order_by("-added_date")):
            d = elem.getNonNullValDict()
            if req.user.is_authenticated:
                if elem.upvotes.filter(pk=req.user.id).count():
                    d["upvoted"] = True
                else:
                    d["upvoted"] = False

                if elem.downvotes.filter(pk=req.user.id).count():
                    d["downvoted"] = True
                else:
                    d["downvoted"] = False
            d["author_name"] = elem.author.username
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
