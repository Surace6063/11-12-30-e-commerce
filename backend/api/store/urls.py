from django.urls import path
from .views import *

urlpatterns = [
    # get or post -> http://127.0.0.1:8000/api/categories/
    path('categories/',CategoryListCreateView.as_view(),name="category-list-create"),
    
    # get, put/patch or delete -> http://127.0.0.1:8000/api/categories/pk/  -> pk -> id
    path('categories/<int:pk>/',CategoryRetriveUpdateDeleteView.as_view(),name="cat-retrive-update-delete")
]