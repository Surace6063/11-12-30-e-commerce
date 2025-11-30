import os
from .models import Product
from django.dispatch import receiver
from django.db.models.signals import post_delete, pre_save

# delete image when Product is deleted
@receiver(post_delete,sender=Product)
def delete_image_on_delete(sender,instance,**kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
            


# delete old image when image is updated            
@receiver(pre_save,sender=Product)
def delete_old_image_on_update(sender,instance,**kwargs):
    if not instance.pk:
        return
    
    try:
        old_image = Product.objects.get(pk=instance.pk).image
    except Product.DoesNotExist:
        return
    
    new_image = instance.image
    if old_image and old_image != new_image:
        if old_image.path and os.path.isfile(old_image.path):
            os.remove(old_image.path)
    
        