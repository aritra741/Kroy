from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Collection, Product
from django.db.models.aggregates import Count, Max, Min
from .serializers import CollectionSerializer, ProductSerializer

@api_view(['GET', 'POST'])
def product_list(request):
    if request.method=='GET':
        queryset= Product.objects.select_related('collection').all()
        serializer= ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
