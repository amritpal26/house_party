from django.db import models

class SpotifyToken(models.Model):
    user = models.ForeignKey('api.UserAccount', on_delete=models.CASCADE)
    access_token = models.CharField(max_length=255, null=False)
    refresh_token = models.CharField(max_length=255, null=False)
    token_type = models.CharField(max_length=127)
    scope = models.CharField(max_length=255)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)