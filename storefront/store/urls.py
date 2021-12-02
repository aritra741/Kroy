from django.urls import path
from . import views

urlpatterns= [
    
    path('users/profile/', view=views.get_user_profile, name='users-profile'),
    path('users/', view=views.get_user_list, name='users'),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.register_user, name='register'),
    
    path('customers/', view=views.customer_list, name='customers'),
    path('customers/<int:id>', view=views.customer_detail, name='customer'),
    
    path('products/customer/<int:id>/', view=views.get_product_by_customer),
    path('products/', view=views.product_list),
    path('products/<int:id>/', view=views.product_detail), # making sure that the id is an integer
    
    path('collections/', view=views.collection_list),
    path('collections/<int:pk>/', view=views.collection_detail), # making sure that the id is an integer

    path('bids/product/<int:id>/', view=views.bid_list_for_product),
    path('bids/', view=views.bid_list),        
    path('bids/<int:id>/', view=views.bid_detail),    
    
]