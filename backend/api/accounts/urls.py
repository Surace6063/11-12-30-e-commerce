from django.urls import path
from .views import RegisterView, LoginView, UserListView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    # post -> http://127.0.0.1:8000/api/auth/register/
    path('register/',RegisterView.as_view(),name="register"),
    
    # post -> http://127.0.0.1:8000/api/auth/login/
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    
    # post -> http://127.0.0.1:8000/api/auth/token/refresh/
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # get -> http://127.0.0.1:8000/api/auth/users/
    path('users/',UserListView.as_view(),name="users")
]