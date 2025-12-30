from rest_framework import serializers
from .models import Order, OrderItem
from cart.models import Cart
from store.models import Product


class OrderItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(
        source="product.title", read_only=True
    )
    product_image = serializers.ImageField(
        source="product.image", read_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'product_title', 'price', 'subtotal','product_image']
        read_only_fields = ['price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = [
            'id',
            'full_name',
            'email',
            'phone_number',
            'address',
            'payment_method',
            'status',
            'city',
            'company_name',
            'pan_number',
            'zip_code',
            'total',
            'items',
            'created_at',
        ]
        read_only_fields = ['status', 'created_at']

    def create(self, validated_data):
        request = self.context['request']
        user = request.user
        items_data = validated_data.pop('items')

        # set default status
        validated_data['status'] = 'pending'

        # create order
        order = Order.objects.create(
            user=user,
            **validated_data
        )

        # create order items securely
        for item in items_data:
            product = Product.objects.get(id=item['product'].id)

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                price=product.price,  # ✅ backend price
            )

        # clear cart after order
        Cart.objects.filter(user=user).delete()

        return order


