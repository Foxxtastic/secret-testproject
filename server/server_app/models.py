from django.db import models


class SecretModel(models.Model):
    id = id
    hash = models.TextField()
    secrettext = models.TextField()
    createdat = models.DateTimeField(auto_now_add=True)
    expiresat = models.DateTimeField(blank=True, null=True)
    remainingviews = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        ordering = ['id']
        db_table = 'secrets'

    def __str__(self) -> str:
        return self.secrettext
