from django.db import models
from django.contrib.auth.models import User
from store.models import Product

# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # method to calculate total amount 
    @property 
    def total(self):
        return sum(item.total for item in self.items.all())
            
    
    def __str__(self):
        return f"{self.user.username}'s cart"


# cart item model  
class CartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="items")  
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    # method to calculate total amount
    @property
    def total(self):
        return self.product.price * self.quantity
    
    def __str__(self):
        return f"{self.product.price} * {self.quantity}"