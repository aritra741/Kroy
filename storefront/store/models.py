from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE, PROTECT


class Collection(models.Model):
    title= models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title

class Customer(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    email= models.EmailField(unique=True)
    phone= models.CharField(max_length=255)
    bought= models.IntegerField()
    sold= models.IntegerField()

class Product(models.Model):
    title = models.CharField(max_length=255)
    description= models.TextField(null=True)
    budget= models.DecimalField(max_digits=8,decimal_places=2)
    last_update= models.DateTimeField(auto_now=True)
    active= models.BooleanField(default=True)
    quantity= models.IntegerField()
    collection= models.ForeignKey(Collection, on_delete=PROTECT, related_name='products') # The product won't be deleted even if we accidentally delete a collection
    customer= models.ForeignKey(Customer, on_delete=CASCADE, null=True, related_name='customerProducts')
    image= models.ImageField(null=True, blank= True)

class Bid(models.Model):
    description= models.TextField(null=True)
    price= models.DecimalField(max_digits=8,decimal_places=2)
    quantity= models.IntegerField()
    customer= models.ForeignKey(Customer, on_delete=CASCADE, null=True, related_name='customerBids')
    product= models.ForeignKey(Product, on_delete=CASCADE, null=True, related_name='productBids')
    image= models.ImageField(null=True, blank= True)

class Order(models.Model):
    
    PAYMENT_STATUS_PENDING= 'P'
    PAYMENT_STATUS_RECEIVED= 'R'
    PAYMENT_STATUS_HANDED_OVER= 'H'
    PAYMENT_STATUS_CHOICES= [
        (PAYMENT_STATUS_RECEIVED, 'Pending'),
        (PAYMENT_STATUS_RECEIVED, 'Recieved'),
        (PAYMENT_STATUS_HANDED_OVER, 'Handed Over')
    ]

    placed_at= models.DateTimeField(auto_now_add=True)
    payment_stats= models.CharField(max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING)
    customer= models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='orders')

class OrderItem(models.Model):
    order= models.ForeignKey(Order, on_delete=models.PROTECT)
    product= models.ForeignKey(Product, on_delete=models.PROTECT, related_name='orderitems')
    quantity= models.PositiveSmallIntegerField()
    unit_price= models.DecimalField(max_digits=8,decimal_places=2)

class Address(models.Model):
    street= models.CharField(max_length=255)
    city= models.CharField(max_length=255)
    # If the customer is deleted, the address is deleted as well (Cascade)
    # This is a one-to-many relationship. Different customers can have the same address
    customer= models.ForeignKey(Customer, on_delete=models.CASCADE) 

class Cart(models.Model):
    created_at= models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart= models.ForeignKey(Cart, on_delete=models.CASCADE)
    product= models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity= models.PositiveSmallIntegerField()