from django.urls import path, re_path
from django.views.generic.base import TemplateView
from graphene_django.views import GraphQLView
from .schema import schema


urlpatterns = [
    path("graphql", GraphQLView.as_view(graphiql=True, schema=schema)),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
