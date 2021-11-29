from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET', 'POST'])
def product_list(request):
    if request.method=='GET':
        queryset= Product.objects.select_related('collection').all()
        serializer= ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer= ProductSerializer(data=request.data)
        if serializer.is_valid():
            return Response('ok')
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def product_detail(request, id):
    product= get_object_or_404(Product, pk=id)
    serializer= ProductSerializer(product)
    return Response(serializer.data)
   


