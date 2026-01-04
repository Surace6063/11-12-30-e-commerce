from django.urls import path
from .views import OrderCreateAPIView, OrderListAPIView, EsewaSuccessAPIView

urlpatterns= [
    # post ->  http://127.0.0.1:8000/api/orders/create/
    path('create/', OrderCreateAPIView.as_view(),name="create-order"),
    
    # get ->  http://127.0.0.1:8000/api/orders/
    path('', OrderListAPIView.as_view(),name="order-list"),
    
    #post -> http://127.0.0.1:8000/api/orders/esewa/verify/
    path('esewa/verify/',EsewaSuccessAPIView.as_view(),name="esewa verfiy")
    
]