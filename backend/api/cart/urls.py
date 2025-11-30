from django.urls import path
from .views import AddToCartView, CartDetailView

urlpatterns = [
    # post ->  http://127.0.0.1:8000/api/carts/add/
    path('add/',AddToCartView.as_view(),name="add-to-cart"),
    
    # get cart detail ->  http://127.0.0.1:8000/api/carts/
    path("",CartDetailView.as_view(),name="cart-detail")
    
]