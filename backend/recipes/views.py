from django.core.serializers import deserialize
from rest_framework import generics, viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from recipes.models import Recipe, Diet, Comment, Rating, Cuisine, Ingredient, Step, StepMedia, RecipeMedia, Favourite, \
    Like, CommentMedia
from recipes.serializers import RecipeSerializer, DietSerializer, CommentSerializer, RatingSerializer, \
    CuisineSerializer, IngredientSerializer, StepSerializer, StepMediaSerializer, RecipeMediaSerializer, \
    FavouriteSerializer, OverallRatingSerializer, LikeSerializer, CommentMediaSerializer, NewRecipeSerializer

from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet, ModelViewSet


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


class StepMediaViewSet(viewsets.ModelViewSet):
    queryset = StepMedia.objects.all()
    serializer_class = StepMediaSerializer
    permission_classes = [IsAuthenticated]


class RecipeMediaViewSet(viewsets.ModelViewSet):
    queryset = RecipeMedia.objects.all()
    serializer_class = RecipeMediaSerializer
    permission_classes = [IsAuthenticated]


class CommentMediaViewSet(viewsets.ModelViewSet):
    queryset = CommentMedia.objects.all()
    serializer_class = CommentMediaSerializer
    permission_classes = [IsAuthenticated]


class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
    permission_classes = [IsAuthenticated]


class CuisineViewSet(viewsets.ModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]


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

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]


class MostFavouritedViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().exclude(total_favourites=0).order_by('-total_favourites').values()
    serializer_class = RecipeSerializer


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all().filter(like=True)
    serializer_class = LikeSerializer
    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]


class MostLikedViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().exclude(total_likes=0).order_by('-total_likes').values()
    serializer_class = RecipeSerializer


# code inspired from https://medium.com/swlh/searching-in-django-rest-framework-45aad62e7782
# other resource used: https://www.django-rest-framework.org/api-guide/filtering/
class SearchAPIView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all().order_by('overall_rating', 'total_favourites')
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    search_fields = ['name', 'ingredients__name', 'creator__email']
    filterset_fields = ['cuisines', 'diets', 'cooking_time']
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


class MyLikesView(ListAPIView):
    def list(self, request, *args, **kwargs):
        account = request.user
        queryset = account.likes.all()
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

class TotalLikesView(ListAPIView):
    def list(self, request, *args, **kwargs):
        # account = request.user
        queryset = Recipe.objects.all().order_by("-total_likes")
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)

class MyRatingsView(ListAPIView):
    def list(self, request, *args, **kwargs):
        account = request.user
        queryset = account.ratings.all()
        serializer = RatingSerializer(queryset, many=True)
        return Response(serializer.data)

class AddToCart(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        r = request.data['recipe']
        user = request.user
        user.shopping_list.add(r)
        return Response("Success added recipe")

class RemoveFromCart(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        r = request.data['recipe']
        user = request.user
        user.shopping_list.remove(r)
        return Response("Success deleted recipe")

class UpdateServings(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        r = request.data['recipe']
        recipe = Recipe.objects.get(id=r)
        old_s = int(recipe.servings)
        s = request.data['servings']

        for i in range(0, len(recipe.ingredients.all())):
            ind = recipe.ingredients.all()[i]
            ind.amount = str(int(s) * round(int(ind.amount) / int(old_s)))
            ind.save()

        recipe.servings = s
        recipe.save()

        return Response("Succesful update servings")


class NewRecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = NewRecipeSerializer

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

