from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.TextField()
    added_date = models.DateTimeField()
    modded_date = models.DateTimeField(null=True, blank=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="product_author")
    upvotes = models.ManyToManyField(User, related_name="product_upvotes")
    downvotes = models.ManyToManyField(User, related_name="product_downvotes")

    def __str__(self):
        return "{0}".format(self.name)

    def getNonNullValDict(self):
        retDict = {}
        for k, v in self.__dict__.items():
            if v is not None and k != '_state':
                retDict[k] = v
        retDict["upvotes"] = self.upvotes.all().count()
        retDict["downvotes"] = self.downvotes.all().count()
        return retDict
