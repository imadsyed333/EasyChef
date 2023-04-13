from django.urls import path

from accounts.views import EditProfileView, SignupView, ProfileView, AllProfilesView, ShoppingListView, IngredientListView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)
# Code inspired by https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8
urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('profile/view/', ProfileView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('logout/', TokenBlacklistView.as_view()),
    path('profile/edit/', EditProfileView.as_view()),

    path('profiles/all/', AllProfilesView.as_view({'get': 'list'})),

    path("shopping_list/", ShoppingListView.as_view()),
    path("ind_list/", IngredientListView.as_view())
]
