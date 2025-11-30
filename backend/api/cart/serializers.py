from rest_framework import serializers
from .models import Cart, CartItem

# cart item serializer
class CartItemSerializer(serializers.ModelSerializer):
    total = serializers.ReadOnlyField() # cannot perform write operation
    
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','total']
        
      


# cart serializer      
class CartSerializer(serializers.ModelSerializer):
    # show all cart items using CartItemSerializer
    items = CartItemSerializer(many=True,read_only=True)
    total = serializers.ReadOnlyField()
    
    class Meta:
        model = Cart
        fields = ['id','items','total','created_at']
        
