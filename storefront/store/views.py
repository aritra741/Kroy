from django.core.checks import messages
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer
from .models import Collection, Customer, Product, Bid, Service
from django.contrib.auth.decorators import login_required
from django.db.models.aggregates import Count, Max, Min
from .serializers import CollectionSerializer,ServiceSerializer, OrderSerializer, ProductSerializer, UserSerializer, UserSerializerWithToken, CustomerSerializer, BidSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer= UserSerializerWithToken(self.user).data
        
        for key, value in serializer.items():
            data[key]= value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    data= request.data
    try:
        user= User.objects.create(
            first_name=data['name'],
            username= data['email'],
            email= data['email'],
            password= make_password(data['password'])
        )

        serializer= UserSerializerWithToken(user, many= False)
        return Response(serializer.data)
    except:
        message= {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_profile(request):
    print(request.user)
    user= request.user
    login(request, user)
    serializer= UserSerializer(user, many= False)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def customer_list(request):
    if request.method=='GET':
        queryset= Customer.objects.all()
        serializer= CustomerSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def customer_detail(request, id):
    customer= get_object_or_404(Customer, pk=id)
    if request.method=='GET':
        serializer= CustomerSerializer(customer)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer= CustomerSerializer(customer,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method=='DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def bid_list(request):
    if request.method=='GET':
        queryset= Bid.objects.select_related('product').all()
        serializer= BidSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= BidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def bid_list_for_product(request, id):
    product= get_object_or_404(Product, id=id)
    serializer= BidSerializer(product.productBids, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def bid_detail(request, id):
    bid= get_object_or_404(Bid, pk=id)
    if request.method=='GET':
        serializer= BidSerializer(bid)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer= BidSerializer(bid,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method=='DELETE':
        bid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_user_list(request):
    users= User.objects.all()
    serializer= UserSerializer(users, many= True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def product_list(request):
    if request.method=='GET':
        queryset= Product.objects.select_related('collection').all()
        serializer= ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= ProductSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def services_list(request):
    if request.method=='GET':
        queryset= Service.objects.all()
        serializer= ServiceSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= ServiceSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_product_by_customer(request, id):
    customer= get_object_or_404(Customer, pk=id)
    serializer= ProductSerializer(customer.customerProducts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_services_by_customer(request, id):
    customer= get_object_or_404(Customer, pk=id)
    serializer= ServiceSerializer(customer.customerServices, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product_by_collection(request, id):
    customer= get_object_or_404(Customer, pk=id)
    serializer= ProductSerializer(customer.customerProducts, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, id):
    product= get_object_or_404(Product, pk=id)
    if request.method=='GET':
        serializer= ProductSerializer(product)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer= ProductSerializer(product,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method=='DELETE':
        if product.orderitems.count()>0: # Kono orderitem e ei product achhe kina
            return Response(status.HTTP_405_METHOD_NOT_ALLOWED)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def services_detail(request, id):
    services= get_object_or_404(Service, pk=id)
    if request.method=='GET':
        serializer= ServiceSerializer(services)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer= ServiceSerializer(services,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method=='DELETE':
        services.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def collection_list(request):
    if request.method=='GET':
        queryset= Collection.objects.annotate(products_count=Count('products')).all()
        serializer= CollectionSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= CollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def collection_detail(request, pk):
    collection= get_object_or_404(
     Collection.objects.annotate(products_count= Count('products')), pk=pk)
    if request.method=='GET':
        serializer= ProductSerializer(collection)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer= ProductSerializer(collection,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method=='DELETE':
        if collection.products.count()>0: # Kono product ei collection e achhe kina
            return Response(status.HTTP_405_METHOD_NOT_ALLOWED)
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def image(request):
    print("entered")
    print(request.data)
    serializer= ProductSerializer(data=request.data)
    if serializer.is_valid():
        # serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def confirm_order(request):
    serializer= OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
