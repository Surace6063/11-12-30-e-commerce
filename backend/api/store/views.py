from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import ProductFilter
from .paginations import CustomPagination
from .permissions import IsAdminOrReadOnly

# get all and create category view    
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]


# get single category, update category and delete category view
class CategoryRetriveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]



# get all and create product view    
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    
    search_fields = ['title','description']  #  http://127.0.0.1:8000/api/products/?search=serach_text
    ordering_fields = ['price', 'created_at'] # http://127.0.0.1:8000/api/products/?ordering= created_at or price
    filterset_class = ProductFilter # http://127.0.0.1:8000/api/products/?max_price=&min_price=
    pagination_class = CustomPagination
    permission_classes = [IsAdminOrReadOnly]


# get single product, uodate product and delete product view
class ProductRetriveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]        