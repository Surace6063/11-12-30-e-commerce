from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from .serializers import OrderSerializer

import hmac, hashlib, base64, uuid, json
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

# ---------- Generate Signature Function ----------
def generate_signature(key, message):
    key = key.encode('utf-8')
    message = message.encode('utf-8')

    hmac_sha256 = hmac.new(key, message, hashlib.sha256)
    digest = hmac_sha256.digest()
    signature = base64.b64encode(digest).decode('utf-8')
    return signature


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
                "order": OrderSerializer(order).data,
                "payment_method": "cod"
            },
            status=status.HTTP_201_CREATED
        )
            
        
         # ---------- eSewa ----------
        elif payment_method == "esewa":
            transaction_uuid = uuid.uuid4()
            tax_amount = 0
            total_amount = "{:.2f}".format(order.total + tax_amount) 

            signed_field_names = "total_amount,transaction_uuid,product_code"
            secret_key = '8gBm/:&EnhH.1/q'
            data_to_sign = (
                f"total_amount={total_amount},"
                f"transaction_uuid={transaction_uuid},"
                f"product_code=EPAYTEST"
            )
            result = generate_signature(secret_key, data_to_sign)
            order.save()

            return Response({
                "order_id": order.id,
                "amount": order.total,
                "tax_amount": tax_amount,
                "total_amount": total_amount,
                "transaction_uuid": str(transaction_uuid),
                "product_delivery_charge": 0,
                "product_service_charge": 0,
                "product_code": "EPAYTEST",
                "signature": result,
                "signed_field_names": signed_field_names,
                "success_url": f"http://localhost:3000/esewa/success/{order.id}",
                "failure_url": "https://developer.esewa.com.np/failure",
                "payment_method": "esewa"
            }, status=status.HTTP_201_CREATED)

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




class EsewaSuccessAPIView(APIView):
    """
    DRF endpoint to handle eSewa success redirect and update order status.
    """

    def post(self, request, *args, **kwargs):
        order_id = request.data.get("order_id")
        data = request.data.get("data")  # Base64 eSewa data

        if not order_id or not data:
            return Response(
                {"message": "Missing order_id or data"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = get_object_or_404(Order, id=order_id)

        try:
            decoded_data = base64.b64decode(data).decode("utf-8")
            data_dict = json.loads(decoded_data)
        except Exception as e:
            return Response(
                {"message": f"Failed to decode data: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        status_value = data_dict.get("status", "").upper()

        if status_value == "COMPLETE":
            order.status = "completed"
            order.save()
            return Response({"message": "Payment successful. Order completed."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": f"Transaction status: {status_value}"}, status=status.HTTP_200_OK)     





# dashboard stat
from datetime import timedelta
from django.utils import timezone
from django.db.models import Sum, F
from django.contrib.auth.models import User
from rest_framework.generics import GenericAPIView



class DashboardStatsView(GenericAPIView):

    def get(self, request):
        six_months_ago = timezone.now() - timedelta(days=180)

        # Total users (last 6 months)
        total_users = User.objects.filter(
            date_joined__gte=six_months_ago
        ).count()

        # Total orders (last 6 months)
        total_orders = Order.objects.filter(
            created_at__gte=six_months_ago
        ).count()

        # Total sales (last 6 months, completed only)
        total_sales = (
            OrderItem.objects
            .filter(
                order__status="completed",
                order__created_at__gte=six_months_ago
            )
            .aggregate(
                total=Sum(F("price") * F("quantity"))
            )["total"] or 0
        )

        return Response({
            "total_users": total_users,
            "total_orders": total_orders,
            "total_sales": total_sales,
        })    

