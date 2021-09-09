from server.generate_keys import create_keys
from django.apps import AppConfig


class ServerAppConfig(AppConfig):
    create_keys()
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server_app'
