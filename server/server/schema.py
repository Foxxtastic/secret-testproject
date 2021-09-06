from datetime import datetime
from datetime import timedelta
from graphene_django import DjangoObjectType
import graphene
from server_app.models import SecretModel
from helpers.create_hashid import create_hashid


def getSecretHash(id: int) -> str:
    return create_hashid(id)


class SecretsType(DjangoObjectType):
    class Meta:
        model = SecretModel
        fields = (
            'id',
            'hash',
            'secrettext',
            'createdat',
            'expiresat',
            'remainingviews'
        )


class Query(graphene.ObjectType):
    secrets = graphene.List(SecretsType)
    secret_by_hash = graphene.Field(
        SecretsType, hash=graphene.String(required=True))

    def resolve_secrets(root, info, **kwargs):
        return SecretModel.objects.all()

    def resolve_secret_by_hash(root, info, hash):
        try:
            return SecretModel.objects.get(hash=hash)
        except SecretModel.DoesNotExist:
            return None


class SecretsInput(graphene.InputObjectType):
    secrettext = graphene.String()
    expiresat = graphene.Int()
    remainingviews = graphene.Int()


class CreateSecret(graphene.Mutation):
    class Arguments:
        input = SecretsInput(required=True)

    secret = graphene.Field(SecretsType)

    @classmethod
    def mutate(cls, root, info, input: SecretsInput):
        secret = SecretModel()
        secret.hash = ''
        secret.secrettext = input.secrettext
        secret.expiresat = datetime.utcnow() + timedelta(minutes=input.expiresat)
        secret.remainingviews = input.remainingviews
        secret.save()
        secret.hash = create_hashid(secret.id)
        secret.save()
        return CreateSecret(secret=secret)


class Mutation(graphene.ObjectType):
    create_secret = CreateSecret.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
