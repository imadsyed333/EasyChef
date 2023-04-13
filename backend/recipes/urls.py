from django.urls import path, include

from rest_framework import routers

from recipes.views import RecipeViewSet, DietViewSet, CommentViewSet, \
    RatingViewSet, CuisineViewSet, IngredientViewSet, \
    SearchAPIView, StepViewSet, StepMediaViewSet, RecipeMediaViewSet, \
    FavouriteViewSet, MostFavouritedViewSet, OverallRatingViewSet, \
    LikeViewSet, MostLikedViewSet, MyFavouritesView, MyInteractionsView, \
    MyRecipesView, CommentMediaViewSet, MyLikesView, TotalLikesView, MyRatingsView, \
    AddToCart, RemoveFromCart, UpdateServings, NewRecipeViewSet

urlpatterns = [
    path('all/', RecipeViewSet.as_view({'get': 'list'})),
    path('create/', NewRecipeViewSet.as_view({'post': 'create'})),
    path('<int:pk>/view/', NewRecipeViewSet.as_view({'get': 'retrieve'})),
    path('<int:pk>/delete/', NewRecipeViewSet.as_view({'delete': 'destroy'})),
    path('<int:pk>/update/', NewRecipeViewSet.as_view({'put': 'update'})),

    path('diets/add/', DietViewSet.as_view({'post': 'create'})),
    path('diets/all/', DietViewSet.as_view({'get': 'list'})),
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

    path('ratings/all/', RatingViewSet.as_view({'get': 'list'})),
    # path('ratings/<int:pk>/view/', RatingViewSet.as_view({'get': 'retrieve'})),
    path('overallratings/all/', OverallRatingViewSet.as_view({'get':'list'})),
    path('overallratings/<int:pk>/view/', OverallRatingViewSet.as_view({'get': 'retrieve'})),


    path('favourites/add/', FavouriteViewSet.as_view({'post': 'create'})),
    path('favourites/all/', FavouriteViewSet.as_view({'get':'list'})),
    path('favourites/<int:pk>/view/', FavouriteViewSet.as_view({'get': 'retrieve'})),
    path('mostfavourited/all/', MostFavouritedViewSet.as_view({'get':'list'})),

    path('favourites/', MyFavouritesView.as_view()),
    path('interactions/', MyInteractionsView.as_view()),
    path('recipes/', MyRecipesView.as_view()),

    path('likes/', MyLikesView.as_view()),
    path('totallikes/', TotalLikesView.as_view()),
    path('ratings/', MyRatingsView.as_view()),
    

    path('likes/add/', LikeViewSet.as_view({'post': 'create'})),
    path('likes/<int:pk>/view/', LikeViewSet.as_view({'get': 'retrieve'})),
    path('likes/all/', MostLikedViewSet.as_view({'get':'list'})),

    path('find/', SearchAPIView.as_view()),

    path('cart/add/', AddToCart.as_view()),
    path('cart/remove/', RemoveFromCart.as_view()),
    path('cart/update/', UpdateServings.as_view())
]
