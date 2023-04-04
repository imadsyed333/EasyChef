from django.shortcuts import get_object_or_404
from rest_framework import serializers

from accounts.models import Account
from recipes.models import Recipe, Diet, Step, Cuisine, Ingredient, RecipeMedia, StepImage, Comment, Rating, Favourite, Like, CommentImage

from rest_framework.fields import CurrentUserDefault

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = ["id", "name"]

class RecipeMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeMedia
        fields = ["id", "media", "recipe"]

    def create(self, validated_data):
        media = RecipeMedia.objects.create(recipe=validated_data['recipe'],
                                           media=validated_data['media'])
        return media

class StepImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepImage
        fields = ["id", "step", "image"]

    def create(self, validated_data):
        image = StepImage.objects.create(step=validated_data['step'],
                                         image=validated_data['image'])
        return image

class StepSerializer(serializers.ModelSerializer):
    images = StepImageSerializer(many=True, required=False)
    class Meta:
        model = Step
        fields = ["id", "content", "prep_time", "cooking_time", "images", 'recipe']
    def create(self, validated_data):
        step = Step.objects.create(content=validated_data['content'],
                                  prep_time=validated_data['prep_time'],
                                  cooking_time=validated_data['cooking_time'],
                                  recipe=validated_data['recipe'])
        return step

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ["id", "name"]

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "amount"]

class CommentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = ["id", 'comment', "image"]

    def create(self, validated_data):
        image = CommentImage.objects.create(comment=validated_data['comment'],
                                         image=validated_data['image'])
        return image


class CommentSerializer(serializers.ModelSerializer):
    images = CommentImageSerializer(many=True, required=False)

    class Meta:
        model = Comment
        # fields = ["recipe", "content"]
        fields = ["id", "recipe", "content", "images"]

    def create(self, validated_data):
        comment = Comment.objects.create(content=validated_data['content'],
                                  poster=self.context['request'].user,
                                  recipe=validated_data['recipe'])
        # comment.save()
        print(comment.content, comment.poster, comment.recipe, comment.images)
        # comment = Comment.objects.create(**validated_data)
        account = self.context['request'].user
        recipe = validated_data['recipe']
        if recipe not in account.interactions.all():
            account.interactions.add(recipe)
        return comment

class RecipeSerializer(serializers.ModelSerializer):
    diets = DietSerializer(many=True, required=False)
    diet_ids = serializers.PrimaryKeyRelatedField(many=True, write_only=True, queryset=Diet.objects.all())

    ingredients = IngredientSerializer(many=True, required=False)
    ingredient_ids = serializers.PrimaryKeyRelatedField(many=True, write_only=True, queryset=Ingredient.objects.all())

    cuisines = CuisineSerializer(many=True, required=False)
    cuisine_ids = serializers.PrimaryKeyRelatedField(many=True, write_only=True, queryset=Cuisine.objects.all())

    steps = StepSerializer(many=True, required=False)

    media = RecipeMediaSerializer(many=True, required=False)

    comments = CommentSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = ["id", 'name', 'images', 'diets', 'diet_ids', 'cuisines', 'cuisine_ids', 'ingredients', 'ingredient_ids', 'prep_time', 'cooking_time', 'steps', 'servings', 'comments']

    def create(self, validated_data):
        diets = validated_data.pop('diet_ids', None)
        ingredients = validated_data.pop('ingredient_ids', None)
        cuisines = validated_data.pop('cuisine_ids', None)

        print("Diets: ", diets)
        print("Cuisines: ", cuisines)
        
        print(self.context['request'].user)

        validated_data['creator'] = self.context['request'].user
        recipe = Recipe.objects.create(**validated_data)
        if diets:
            recipe.diets.set(diets)
        if ingredients:
            recipe.ingredients.set(ingredients)
        if cuisines:
            recipe.cuisines.set(cuisines)
        return recipe


class RatingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rating
        fields = ["id", "recipe", "value"]

    def create(self, validated_data):
        
        recipe = validated_data["recipe"]

        account = self.context['request'].user

        if recipe not in account.interactions.all():
            account.interactions.add(recipe)
        print("ADD RECIPE RATING: ", recipe, " -- ", validated_data['value'], "out of 5")

        rating, created = Rating.objects.update_or_create(recipe=validated_data['recipe'], 
                                                    poster=self.context['request'].user, 
                                                    defaults={'value': validated_data['value']})
        rating.save()
        # UPDATE RECIPE'S OVERALL RATING:
        # if overall rating is not null
        if recipe.overall_rating:
            print("OVERALL RATING BEFORE: ", recipe.overall_rating)
            recipes = Rating.objects.filter(recipe=validated_data['recipe'])

            # all ratings for this recipe
            all_ratings = []
            for r in recipes:
                all_ratings.append(r.value)
            print("RATINGS: ", all_ratings)

            # find avg of all the ratings for this recipe
            recipe.overall_rating = sum(all_ratings)/len(all_ratings)
            recipe.save()

            print("OVERALL RATING AFTER: ", recipe.overall_rating)
        # if no rating given yet, set initial rating to this rating
        else:
            recipe.overall_rating = validated_data['value']
            recipe.save()
            print("NEW OVERALL RATING: ", recipe.overall_rating)
        
        return rating

class OverallRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ["id", "name", "overall_rating"]

class FavouriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Favourite
        fields = ["id", "recipe", "favourite"]

    def create(self, validated_data):
        favourite, created = Favourite.objects.update_or_create(recipe=validated_data['recipe'],
                                                                poster=self.context['request'].user,
                                                                defaults={'favourite': validated_data['favourite']})
        favourite.save()

        # print(Recipe.objects.all())
        print('fav? ', validated_data['favourite'])
        print('fav? ', self.context['request'].user)
        # user favourited this recipe
        if validated_data['favourite']:
            # favourited_recipe = Recipe.objects.filter(id=validated_data['recipe'].id)
            favourited_recipe = validated_data['recipe']
            favoriter = self.context['request'].user
            print('+initial favouriters: ', favourited_recipe.favoriters.all())
            # if favoriters is empty
            if not favourited_recipe.favoriters.all():
                favourited_recipe.favoriters.set([favoriter])
                # one person has favourited this recipe
                favourited_recipe.total_favourites=1
                print(favourited_recipe.total_favourites)

                favourited_recipe.save()
                # Recipe.objects.get(id=validated_data['recipe'].id).favoriters
                print('+new favouriter: ', favoriter)
                print('+favourited recipe: ', favourited_recipe)
                print('+total favouriters: ', favourited_recipe.favoriters.all())
            # if there is at least one favoriter
            else:
                old_favouriters = list(favourited_recipe.favoriters.all())
                print('+old favouriters: ', old_favouriters)
                print('+old favouriters: ', list(old_favouriters))
                
                # only favourite if recipe is not already favourited by this user
                if favoriter not in old_favouriters:
                    all_favouriters = old_favouriters + [favoriter]
                    print('+all favouriters: ', all_favouriters)

                    # total favourites for this recipe
                    favourited_recipe.total_favourites=len(all_favouriters)
                    print(favourited_recipe.total_favourites)
                    # print('+all favouriters: ', all_favouriters)
                    favourited_recipe.favoriters.set(all_favouriters)
                    favourited_recipe.save()

                    print('+new favouriter: ', favoriter)
                    print('+favourited recipe: ', favourited_recipe)
                    print('+favouriters: ', favourited_recipe.favoriters.all())
        # if unfavourited
        else:
            favourited_recipe = Recipe.objects.get(id=validated_data['recipe'].id)
            favourited_recipe.favoriters.remove(Account.objects.get(email=self.context['request'].user))
            favourited_recipe.save()

            total_favs = list(favourited_recipe.favoriters.all())
            favourited_recipe.total_favourites = len(total_favs)
            favourited_recipe.save()
            print(favourited_recipe.total_favourites)

            print('-favouriters: ', Account.objects.get(email=self.context['request'].user))
            print('-favouriters: ', favourited_recipe.favoriters.all())

        return favourite




class LikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Like
        fields = ["id", "recipe", "like"]

    def create(self, validated_data):
        like, created = Like.objects.update_or_create(recipe=validated_data['recipe'],
                                                      liker=self.context['request'].user,
                                                    defaults={'like': validated_data['like']})
        like.save()

        print('like? ', validated_data['like'])
        print('like? ', self.context['request'].user)
        if validated_data['like']:
            liked_recipe = validated_data['recipe']

            account = self.context['request'].user
            recipe = validated_data['recipe']
            if recipe not in account.interactions.all():
                account.interactions.add(recipe)

            liker = self.context['request'].user
            print('+initial likers: ', liked_recipe.likers.all())
            if not liked_recipe.likers.all():
                liked_recipe.likers.set([liker])
                liked_recipe.total_likes=1
                print(liked_recipe.total_likes)

                liked_recipe.save()
                print('+new liker: ', liker)
                print('+liked recipe: ', liked_recipe)
                print('+total likers: ', liked_recipe.likers.all())
            else:
                old_likers = list(liked_recipe.likers.all())
                print('+old likers: ', old_likers)
                print('+old likers: ', list(old_likers))
                
                if liker not in old_likers:
                    all_likers = old_likers + [liker]
                    print('+all likers: ', all_likers)

                    liked_recipe.total_likes=len(all_likers)
                    print(liked_recipe.total_likes)
                    liked_recipe.likers.set(all_likers)
                    liked_recipe.save()

                    print('+new liker: ', liker)
                    print('+liked recipe: ', liked_recipe)
                    print('+likers: ', liked_recipe.likers.all())
        # if unliked
        else:
            liked_recipe = Recipe.objects.get(id=validated_data['recipe'].id)
            liked_recipe.likers.remove(Account.objects.get(email=self.context['request'].user))
            liked_recipe.save()

            account = self.context['request'].user
            recipe = validated_data['recipe']
            if recipe in account.interactions.all():
                account.interactions.remove(recipe)

            total_likes = list(liked_recipe.likers.all())
            liked_recipe.total_likes = len(total_likes)
            liked_recipe.save()
            print(liked_recipe.total_likes)

            print('-likers: ', Account.objects.get(email=self.context['request'].user))
            print('-likers: ', liked_recipe.likers.all())

        return like
