from django_filters import FilterSet, NumberFilter
from .models import Product

class ProductFilter(FilterSet):
    min_price = NumberFilter(field_name="price",lookup_expr="gte")
    max_price = NumberFilter(field_name="price",lookup_expr="lte")
    
    class Meta:
        model = Product
        fields = ['max_price','min_price']