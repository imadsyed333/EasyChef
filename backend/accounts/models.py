from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Account(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100,  null=True)
    phone_number = models.CharField(max_length=100,  null=True)
    avatar = models.ImageField(null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


