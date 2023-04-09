from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


from accounts.models import Account
from accounts.serializers import AccountSerializer, UpdateUserSerializer

from recipes.serializers import RecipeSerializer


# Code inspired by https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8

# Create your views here.
class SignupView(APIView):
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = AccountSerializer(request.user)
        return Response(serializer.data)

class EditProfileView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return self.request.user


class ShoppingListView(ListAPIView):
    def list(self, request, *args, **kwargs):
        account = request.user
        queryset = account.shopping_list
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)
