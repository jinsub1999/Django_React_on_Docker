from .models import Product
from django import forms


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["name", "price", "description"]
        widgets = {
            "name": forms.TextInput(),
            "price": forms.NumberInput(),
            "content": forms.Textarea(),
        }
