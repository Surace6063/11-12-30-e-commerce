from .serializers import CartItemSerializer, CartSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Cart,CartItem

# add to cart view
class AddToCartView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    pagination_class = [IsAuthenticated]
    
    def perform_create(self, serializer):
        # get or create cart for current loggedIn user
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        
        # check if the product already exists in the cart
        product = serializer.validated_data['product']  # must send product in request data
        quantity = serializer.validated_data.get('quantity', 1)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not created:
            # if exists, update the quantity
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        
        cart_item.save()          
        



# get cart detail
class CartDetailView(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # get or create cart for current loggedIn user
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart
