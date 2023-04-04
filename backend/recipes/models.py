from django.db import models

from accounts.models import Account
from django.core.validators import MaxValueValidator, MinValueValidator, FileExtensionValidator

class Diet(models.Model):
    name = models.CharField(max_length=100)

class Cuisine(models.Model):
    name = models.CharField(max_length=100)

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    amount = models.PositiveIntegerField()

class Recipe(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(to=Account, related_name='recipes', on_delete=models.CASCADE)
    diets = models.ManyToManyField(Diet, blank=True, related_name="recipes")
    cuisines = models.ManyToManyField(Cuisine, blank=True, related_name="recipes")
    ingredients = models.ManyToManyField(Ingredient, blank=True, related_name="recipes")
    servings = models.PositiveIntegerField(default=1)
    prep_time = models.IntegerField(null=True)
    cooking_time = models.IntegerField(null=True)
    interactors = models.ManyToManyField(Account, blank=True, related_name="interactions")
    favoriters = models.ManyToManyField(Account, blank=True, related_name="favorites")
    total_favourites = models.IntegerField(default=0)
    likers = models.ManyToManyField(Account, blank=True, related_name="likes")
    total_likes = models.IntegerField(default=0)
    overall_rating = models.DecimalField(max_digits=3, decimal_places=2, null=True)
    '''---From Foreign Key---'''
    '''media'''
    '''comments'''
    '''ratings'''
    '''steps'''

class Comment(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=100)
    poster = models.ForeignKey(to=Account, on_delete=models.CASCADE, related_name='comments')
    # comment_image = models.ImageField(null=True, blank=True, upload_to="comment_images/")
    '''---From Foreign Key---'''
    '''media'''

class CommentMedia(models.Model):
    comment = models.ForeignKey(to=Comment, on_delete=models.CASCADE, related_name='media')
    media = models.FileField(null=True, blank=True, upload_to="comment_images/",
                            validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'jpeg', 'jpg', 'png'])])

class Step(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='steps')
    content = models.CharField(max_length=100)
    prep_time = models.IntegerField(blank=True)
    cooking_time = models.IntegerField(blank=True)
    '''---From Foreign Key---'''
    '''media'''

class Rating(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='ratings')
    value = models.IntegerField(validators=[MaxValueValidator(5), 
                                            MinValueValidator(1)])
    poster = models.ForeignKey(to=Account, on_delete=models.CASCADE, related_name='ratings')

class RecipeMedia(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='media')
    media = models.FileField(null=True, blank=True, upload_to="recipe_images/", 
                            validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'jpeg', 'jpg', 'png'])])

class StepMedia(models.Model):
    step = models.ForeignKey(to=Step, on_delete=models.CASCADE, related_name='media')
    media = models.FileField(null=True, blank=True, upload_to="step_images/",
                            validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'jpeg', 'jpg', 'png'])])

class Favourite(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='favourites')
    favourite = models.BooleanField(default=False)    
    poster = models.ForeignKey(to=Account, on_delete=models.CASCADE, related_name='favourites')

class Like(models.Model):
    recipe = models.ForeignKey(to=Recipe, on_delete=models.CASCADE, related_name='recipe_likes')
    like = models.BooleanField(default=False)    
    liker = models.ForeignKey(to=Account, on_delete=models.CASCADE, related_name='recipe_likes')
