from django.urls import path, include

from rest_framework import routers

from recipes.views import RecipeViewSet, DietViewSet, CommentViewSet, \
    RatingViewSet, CuisineViewSet, IngredientViewSet, \
    SearchAPIView, StepViewSet, StepImageViewSet, RecipeImageViewSet, \
    FavouriteViewSet, MostFavouritedViewSet, OverallRatingViewSet, \
    LikeViewSet, MostLikedViewSet, MyFavouritesView, MyInteractionsView, \
    MyRecipesView, CommentImageViewSet

urlpatterns = [
    path('add/', RecipeViewSet.as_view({'post': 'create'})),
    path('<int:pk>/view/', RecipeViewSet.as_view({'get': 'retrieve'})),
    path('<int:pk>/delete/', RecipeViewSet.as_view({'get': 'destroy'})),
    path('all/', RecipeViewSet.as_view({'get': 'list'})),

    path('diets/add/', DietViewSet.as_view({'post': 'create'})),
    path('ingredients/add/', IngredientViewSet.as_view({'post':'create'})),
    path('cuisines/add/', CuisineViewSet.as_view({'post': 'create'})),

    path('images/add/', RecipeImageViewSet.as_view({'post':'create'})),

    path('steps/add/', StepViewSet.as_view({'post':'create'})),
    path('steps/image/add/', StepImageViewSet.as_view({'post':'create'})),

    path('comments/add/', CommentViewSet.as_view({'post': 'create'})),
    path('comments/image/add/', CommentImageViewSet.as_view({'post': 'create'})),
    path('comments/all/', CommentViewSet.as_view({'get': 'list'})),

    path('ratings/add/', RatingViewSet.as_view({'post': 'create'})),
    path('ratings/all/', OverallRatingViewSet.as_view({'get':'list'})),

    path('favourites/add/', FavouriteViewSet.as_view({'post': 'create'})),
    path('favourites/all/', MostFavouritedViewSet.as_view({'get':'list'})),

    path('favourites/', MyFavouritesView.as_view()),
    path('interactions/', MyInteractionsView.as_view()),
    path('recipes/', MyRecipesView.as_view()),
    
    path('likes/add/', LikeViewSet.as_view({'post': 'create'})),
    path('likes/all/', MostLikedViewSet.as_view({'get':'list'})),

    path('find/', SearchAPIView.as_view()),
]
