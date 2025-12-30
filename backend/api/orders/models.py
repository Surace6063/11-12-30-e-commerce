from django.db import models
from django.contrib.auth.models import User
from store.models import Product


class Order(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    PAYMENT_CHOICES = [
        ("cod", "Cash on Delivery"),
        ("esewa", "Esewa"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # ===== Checkout Form Fields =====
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)

    city = models.CharField(max_length=100)
    address = models.TextField()
    zip_code = models.CharField(max_length=20, blank=True, null=True)

    company_name = models.CharField(max_length=255, blank=True, null=True)
    pan_number = models.CharField(max_length=50, blank=True, null=True)

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES,
        default="cod"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.full_name}"

    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"

    @property
    def subtotal(self):
        return self.price * self.quantity

