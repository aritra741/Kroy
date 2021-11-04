from django.urls import path
from . import views

urlpatterns= [
    path('hello/', view=views.sayHello)
]