from django.db import models
from django.contrib.auth.models import User

class UserDatabase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    json_data = models.TextField()
    phone_reg_name = models.CharField(max_length=255, unique=True)
