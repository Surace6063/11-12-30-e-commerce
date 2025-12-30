from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order
from .serializers import OrderSerializer

# create order
class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        order = serializer.save()
        
        payment_method = order.payment_method.lower()
        
        if payment_method == 'cod':
            order.save()
            return Response(
            {
                "message": "Order placed successfully",
                "order": OrderSerializer(order).data
            },
            status=status.HTTP_201_CREATED
        )
            
        
         # ---------- eSewa ----------
        elif payment_method == "esewa":
            pass

        # ---------- Invalid ----------
        return Response(
            {"message": f"Invalid payment method '{order.payment}'"},
            status=status.HTTP_400_BAD_REQUEST
        )


        



# list order
class OrderListAPIView(generics.ListAPIView):
    """
    - Normal users see only their own orders
    - Admin users see all orders
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            # Admin sees all orders
            return Order.objects.all().order_by('-created_at')
        # Normal user sees only their own orders
        return Order.objects.filter(user=user).order_by('-created_at')



