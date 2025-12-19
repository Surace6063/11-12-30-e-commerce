from rest_framework import serializers
from .models import Cart, CartItem

# cart item serializer
class CartItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(
        source='product.title',
        read_only=True
    )
    product_price = serializers.DecimalField(
        source='product.price',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )
    product_image = serializers.ImageField(
        source='product.image',
        read_only=True
    )
    product_category = serializers.CharField(
        source='product.category.name',
        read_only=True
    )
    total = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',          # for WRITE (product ID)
            'product_title',
            'product_price',
            'product_image',
            'product_category',
            'quantity',
            'total'
        ]
        
      


# cart serializer      
class CartSerializer(serializers.ModelSerializer):
    # show all cart items using CartItemSerializer
    items = CartItemSerializer(many=True,read_only=True)
    total = serializers.ReadOnlyField()
    total_quantity = serializers.ReadOnlyField()
    
    class Meta:
        model = Cart
        fields = ['id','items','total','total_quantity','created_at']
        
