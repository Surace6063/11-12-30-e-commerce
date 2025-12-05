from django_filters import FilterSet, NumberFilter, CharFilter
from .models import Product

class ProductFilter(FilterSet):
    min_price = NumberFilter(field_name="price",lookup_expr="gte")
    max_price = NumberFilter(field_name="price",lookup_expr="lte")
    category = CharFilter(field_name="category__name",lookup_expr="icontains")
    
    class Meta:
        model = Product
        fields = ['max_price','min_price','category']