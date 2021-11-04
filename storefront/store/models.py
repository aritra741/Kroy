from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=255)
    description= models.TextField
    budget= models.DecimalField(max_digits=7,decimal_places=2)
    last_update= models.DateTimeField(auto_now=true)
    active= models.BooleanField(default=True)

class Customer(models.Manager):
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    email= models.EmailField(unique=true)
    phone= models.CharField(max_length=255)
    bought= models.IntegerField()
    sold= models.IntegerField()