from django.urls import path, include

from rest_framework import routers

from recipes.views import RecipeViewSet, DietViewSet, CommentViewSet, \
    RatingViewSet, CuisineViewSet, IngredientViewSet, \
    SearchAPIView, StepViewSet, StepMediaViewSet, RecipeMediaViewSet, \
    FavouriteViewSet, MostFavouritedViewSet, OverallRatingViewSet, \
    LikeViewSet, MostLikedViewSet, MyFavouritesView, MyInteractionsView, \
    MyRecipesView, CommentMediaViewSet, NewRecipeViewSet

urlpatterns = [
    path('all/', RecipeViewSet.as_view({'get': 'list'})),
    path('create/', NewRecipeViewSet.as_view({'post': 'create'})),
    path('<int:pk>/view/', NewRecipeViewSet.as_view({'get': 'retrieve'})),
    path('<int:pk>/delete/', NewRecipeViewSet.as_view({'delete': 'destroy'})),
    path('<int:pk>/update/', NewRecipeViewSet.as_view({'put': 'update'})),

    path('diets/add/', DietViewSet.as_view({'post': 'create'})),
    path('diets/<int:pk>/view/', DietViewSet.as_view({'get': 'retrieve'})),
    path('ingredients/add/', IngredientViewSet.as_view({'post': 'create'})),
    path('cuisines/add/', CuisineViewSet.as_view({'post': 'create'})),
    path('cuisines/all/', CuisineViewSet.as_view({'get': 'list'})),

    path('media/add/', RecipeMediaViewSet.as_view({'post': 'create'})),

    path('steps/add/', StepViewSet.as_view({'post': 'create'})),
    path('steps/media/add/', StepMediaViewSet.as_view({'post': 'create'})),

    path('comments/add/', CommentViewSet.as_view({'post': 'create'})),
    path('comments/media/add/', CommentMediaViewSet.as_view({'post': 'create'})),
    path('comments/all/', CommentViewSet.as_view({'get': 'list'})),

    path('ratings/add/', RatingViewSet.as_view({'post': 'create'})),
    path('ratings/all/', OverallRatingViewSet.as_view({'get': 'list'})),

    path('favourites/add/', FavouriteViewSet.as_view({'post': 'create'})),
    path('favourites/all/', MostFavouritedViewSet.as_view({'get': 'list'})),

    path('favourites/', MyFavouritesView.as_view()),
    path('interactions/', MyInteractionsView.as_view()),
    path('recipes/', MyRecipesView.as_view()),

    path('likes/add/', LikeViewSet.as_view({'post': 'create'})),
    path('likes/all/', MostLikedViewSet.as_view({'get': 'list'})),

    path('find/', SearchAPIView.as_view()),
]
