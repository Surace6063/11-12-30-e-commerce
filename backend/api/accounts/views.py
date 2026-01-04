from rest_framework import generics
from .serializers import RegisterSerializer, LoginSerializer, UserListSerializer
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView


# register view
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] # allow any user to register
    
# login view
class LoginView(TokenObtainPairView):
    serializer_class =  LoginSerializer
    permission_classes = [AllowAny]  

# user list view    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer  # You can create a separate serializer if needed
    permission_classes = [IsAdminUser]    # Only admin can access    