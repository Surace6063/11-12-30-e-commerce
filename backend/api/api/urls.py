from django.contrib import admin
from django.urls import path, include
from django.conf import settings  
from django.conf.urls.static import static 

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # store app urls
    path('api/',include('store.urls')),
    
    # account app urls
    path('api/auth/',include('accounts.urls')),
    
    # cart app urls
    path('api/carts/',include('cart.urls'))
]


if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)