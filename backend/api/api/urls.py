from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # store app urls
    path('api/',include('store.urls')),
]
