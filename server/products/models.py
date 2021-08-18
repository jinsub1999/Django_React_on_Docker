from django.db import models

# Create your models here.


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.TextField()
    added_date = models.DateTimeField()

    def __str__(self):
        return "{0}".format(self.name)
