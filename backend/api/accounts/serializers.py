from rest_framework import serializers
from django.contrib.auth.models import User

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