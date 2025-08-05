from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = (
        ('ADMIN', 'Admin'),
        ('LEAD', 'Team Lead'),
        ('ANIMATOR', 'Animator'),
        ('DEVELOPER', 'Game Developer'),
        ('EDUCATOR', 'Educator'),
    )
    
    role = models.CharField(max_length=10, choices=ROLES, default='ANIMATOR')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    
    def __str__(self):
        return self.username