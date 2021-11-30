from django.urls import path
from . import views

urlpatterns= [
    path('products/', view=views.product_list),
    path('products/<int:id>/', view=views.product_detail), # making sure that the id is an integer
    path('collections/', view=views.collection_list),
    path('collections/<int:pk>/', view=views.collection_detail), # making sure that the id is an integer
    
]