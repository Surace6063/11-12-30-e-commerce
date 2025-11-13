from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer

# get all and create category view    
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# get single category, uodate category and delete category view
class CategoryRetriveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
        