from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# regsiter seriaizer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email','username','password']
    
    # validate email -> field level validation
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value    
    
    # save user to user model -> triggers automatically
    def create(self,validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        
        # hash passoword
        user.set_password(validated_data['password'])    
        # save user to database
        user.save()
        return user


# login serializer    
class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # access user
        user = self.user
        
        # custom response
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_staff or user.is_superuser
        }
        
        return data 
    

# user list serializer
class UserListSerializer(serializers.ModelSerializer):
    last_login = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", default=None, allow_null=True)
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'is_staff',
            'is_superuser',
            'is_active',
            'last_login',
            'date_joined'
        ]   