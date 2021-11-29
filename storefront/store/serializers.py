import collections
from rest_framework import serializers
from decimal import Decimal
from store.models import Product, Collection

class CollectionSerializer(serializers.Serializer):
    id= serializers.IntegerField()
    title= serializers.CharField(max_length=255)

class ProductSerializer(serializers.Serializer):
    id= serializers.IntegerField()
    title= serializers.CharField(max_length= 255)
    budget= serializers.DecimalField(max_digits=8,decimal_places=2)
    collection= CollectionSerializer()
    # budget_with_tax= serializers.SerializerMethodField(method_name='withTax')

    # def withTax(self, product: Product):
    #     return product.budget*Decimal(1.1)
    # This is for adding customized stuff