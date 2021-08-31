from .models import Product, Review
from django import forms


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["name", "price", "description"]
        widgets = {
            "name": forms.TextInput(),
            "price": forms.NumberInput(),
            "description": forms.Textarea(),
        }


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["content"]
        widgets = {
            "content": forms.Textarea(),
        }
