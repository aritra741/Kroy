import collections
from os import name
from django.db.models import fields
from rest_framework import serializers
from decimal import Decimal
from django.contrib.auth.models import User
from store.models import Product, Collection, Customer, Bid
from rest_framework_simplejwt.tokens import RefreshToken, Token

class UserSerializer(serializers.ModelSerializer):

    name= serializers.SerializerMethodField(read_only= True)
    isAdmin= serializers.SerializerMethodField(read_only= True)

    class Meta:
        model= User
        fields= ['id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        name= obj.first_name

        if name=='':
            name= obj.email

        return name

    def get_isAdmin(self, obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token= serializers.SerializerMethodField(read_only= True)
    class Meta:
        model= User
        fields= ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self,obj):
        token= RefreshToken.for_user(obj)
        return str(token.access_token)

class CollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model= Collection
        fields= ['id', 'title', 'products_count']

    products_count= serializers.IntegerField()

    # id= serializers.IntegerField()
    # title= serializers.CharField(max_length=255)


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model= Customer
        fields= '__all__'

class BidSerializer(serializers.ModelSerializer):

    class Meta:
        model= Bid
        fields= '__all__'



class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= Product
        fields= ['id', 'title', 'description', 'budget', 'quantity', 'collection', 'customer', 'image']
    
    # id= serializers.IntegerField()
    # title= serializers.CharField(max_length= 255)
    # budget= serializers.DecimalField(max_digits=8,decimal_places=2)
    # collection= CollectionSerializer()
    
    # budget_with_tax= serializers.SerializerMethodField(method_name='withTax')

    # def withTax(self, product: Product):
    #     return product.budget*Decimal(1.1)
    # This is for adding customized stuff