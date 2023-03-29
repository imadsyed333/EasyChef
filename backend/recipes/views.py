from django.shortcuts import render

from rest_framework import generics, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response


from recipes.models import Recipe, Diet, Comment, Rating, Cuisine, Ingredient, Step, StepImage, RecipeImage, Favourite, Like, CommentImage
from recipes.serializers import RecipeSerializer, DietSerializer, CommentSerializer, RatingSerializer, \
    CuisineSerializer, IngredientSerializer, StepSerializer, StepImageSerializer, RecipeImageSerializer, \
        FavouriteSerializer, OverallRatingSerializer, LikeSerializer, CommentImageSerializer

from rest_framework import filters
# Create your views here.
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

class StepImageViewSet(viewsets.ModelViewSet):
    queryset = StepImage.objects.all()
    serializer_class = StepImageSerializer
    permission_classes = [IsAuthenticated]

class RecipeImageViewSet(viewsets.ModelViewSet):
    queryset = RecipeImage.objects.all()
    serializer_class = RecipeImageSerializer
    permission_classes = [IsAuthenticated]

class CommentImageViewSet(viewsets.ModelViewSet):
    queryset = CommentImage.objects.all()
    serializer_class = CommentImageSerializer
    permission_classes = [IsAuthenticated]

class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]

class CuisineViewSet(viewsets.ModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    permission_classes = [IsAuthenticated]

class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer

# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticated]

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

class RatingViewSet(viewsets.ModelViewSet):
    # filter by highest rating first
    queryset = Rating.objects.all().filter().order_by('-value')
    serializer_class = RatingSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

class OverallRatingViewSet(viewsets.ModelViewSet):


    queryset = Recipe.objects.all().filter().order_by('-overall_rating')
    serializer_class = OverallRatingSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

class FavouriteViewSet(viewsets.ModelViewSet):
    # all favourited recipes
    queryset = Favourite.objects.all().filter(favourite=True)
    serializer_class = FavouriteSerializer

class MostFavouritedViewSet(viewsets.ModelViewSet):

    queryset = Recipe.objects.all().exclude(total_favourites=0).order_by('-total_favourites').values()
    serializer_class = RecipeSerializer

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().filter(like=True)
    serializer_class = LikeSerializer

class MostLikedViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().exclude(total_likes=0).order_by('-total_likes').values()
    serializer_class = RecipeSerializer


# code inspired from https://medium.com/swlh/searching-in-django-rest-framework-45aad62e7782
# other resource used: https://www.django-rest-framework.org/api-guide/filtering/
class SearchAPIView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all().order_by('overall_rating', 'total_favourites')
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    search_fields = ['name', 'ingredients__name', 'creator__email']
    filterset_fields = ['cuisines', 'diets', 'cooking_time' ]
    serializer_class = RecipeSerializer

class MyFavouritesView(ListAPIView):
    def list(self, request, *args, **kwargs):
        account = request.user
        queryset = account.favorites.all()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

class MyInteractionsView(ListAPIView):
    def list(self, request, *args, **kwargs):
        account = request.user
        queryset = account.interactions.all()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

class MyRecipesView(ListAPIView):
    def list(self, request, *args, **kwargs):
        account = request.user
        queryset = account.recipes.all()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

