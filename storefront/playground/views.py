from django.db.models.expressions import Value
from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Value, Func, Q, F, query
from django.db.models.aggregates import Count, Max, Min
from django.db import transaction
from store.models import Collection, Customer, Product


# @transaction.atomic() -> do this for transactions such as orders etc, so that the database doesnt reach an inconsistent state
def sayHello(request):
    boroProduct= Product.objects.filter(budget__range=(20,2000))
    product= Product.objects.filter(budget__gt=100).filter(active=True) # AND operation
    product= Product.objects.filter(Q(budget__gt=100) | Q(active=True)) # OR operation
    product= Product.objects.filter(Q(budget__gt=100) & ~Q(active=True)) # AND NOT operation
    product= Product.objects.filter(budget=F('quantity')) # Budget equals the value in quantity
    product= Product.objects.filter(collection__id=1)
    product= Product.objects.select_related('collection').all() # Fetch the related table too

    queryset= Customer.objects.annotate(
        full_name= Func(F('first_name'),Value(" "),F('last_name'), function='CONCAT') 
    ) # Django database function
    
    # gt= greater than
    # gte= greater than or equal
    # We can find more on the querysets documentation.
    # We can do stuff like search in a range 
    collection= Collection()
    collection.title= "New Collection"
    collection.save()

    Product.objects.raw("SELECT * FROM store_product")

    return render(request, 'hello.html', {'name': 'whatName', 'products': queryset})
