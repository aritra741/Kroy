from django.shortcuts import render
from django.http import HttpResponse

def calculate():
    x= 1
    return x

def sayHello(request):
    x= calculate()
    return render(request, 'hello.html')
