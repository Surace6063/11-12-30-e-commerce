from rest_framework import serializers
from .models import Category, Product

# category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','created_at']


# product serializer
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source="category",read_only=True)
    class Meta:
        model = Product
        fields = ['id','category','title','slug','description','category_name',
                  'image','price','stock','created_at']            