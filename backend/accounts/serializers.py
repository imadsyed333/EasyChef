from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token

from accounts.models import Account

# Code from https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication

# Code inspired by https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8

#Code from https://medium.com/django-rest/django-rest-framework-change-password-and-update-profile-1db0c144c0a3
class AccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=Account.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = Account
        fields = ('password', 'password2',
                  'email', 'first_name', 'last_name', 'phone_number', 'avatar')
        # extra_kwargs = {
        #     'first_name': {'required': False},
        #     'last_name': {'required': False},
        #     'phone_number': {'required': False},
        #     'avatar': {'required': False},
        # }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        return attrs
    def create(self, validated_data):
        account = Account.objects.create(email=validated_data['email'],
                                          first_name=validated_data['first_name'],
                                          last_name=validated_data['last_name'],
                                          phone_number=validated_data['phone_number'],
                                          avatar=validated_data['avatar'])
        account.set_password(validated_data['password'])
        account.save()

        return account


class UpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account

        fields = ('email', 'first_name', 'last_name', 'phone_number', 'avatar')

        extra_kwargs = {
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'phone_number': {'required': False},
            'avatar': {'required': False},
        }



    def update(self, instance, validated_data):
        if validated_data['first_name']:
            instance.first_name = validated_data['first_name']
        if validated_data['last_name']:
            instance.last_name = validated_data['last_name']
        if validated_data['phone_number']:
            instance.phone_number = validated_data['phone_number']
        if validated_data['avatar']:
            instance.avatar = validated_data['avatar']
        instance.save()

        return instance


