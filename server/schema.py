import base64
from datetime import datetime
from datetime import timedelta
from graphene_django import DjangoObjectType
from .server_app.models import SecretModel
import graphene
from helpers.create_hashid import create_hashid
import rsa

publicKey = rsa.PublicKey.load_pkcs1(
    open("publickey.key", "rb").read(), format="PEM")
privateKey = rsa.PrivateKey.load_pkcs1(
    open("privatekey.key", "rb").read(), format="PEM")


def stringToBytes(str: str) -> bytes:
    result = str.replace('\'', '')
    result_length = len(result)
    result = result[1:result_length]
    return result.encode()


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
            'maximumviews',
            'currentviews'
        )


class Query(graphene.ObjectType):
    secrets = graphene.List(SecretsType)
    secret_by_hash = graphene.Field(
        SecretsType, hash=graphene.String(required=True))

    def resolve_secrets(root, info, **kwargs):
        return SecretModel.objects.all()

    def resolve_secret_by_hash(root, info, hash):
        try:
            secret: SecretModel = SecretModel.objects.get(hash=hash)
            print(secret.expiresat)
            if (secret.expiresat != None and datetime.utcnow() > secret.expiresat) or secret.currentviews >= secret.maximumviews:
                return None

            secret.currentviews = secret.currentviews + 1
            secret.save()
            encoded_secrettext = bytes(secret.secrettext.encode())
            decoded_secrettext = rsa.decrypt(base64.b64decode(
                encoded_secrettext), priv_key=privateKey).decode()
            secret.secrettext = decoded_secrettext
            return secret
        except SecretModel.DoesNotExist:
            return None


class SecretsInput(graphene.InputObjectType):
    secrettext = graphene.String()
    expiresat = graphene.Int()
    maximumviews = graphene.Int()


class CreateSecret(graphene.Mutation):
    class Arguments:
        input = SecretsInput(required=True)

    secret = graphene.Field(SecretsType)

    @ classmethod
    def mutate(cls, root, info, input: SecretsInput):
        secret = SecretModel()
        secret.hash = ''
        encoded_bytes = rsa.encrypt(
            input.secrettext.encode(), pub_key=publicKey)
        secret.secrettext = base64.b64encode(encoded_bytes).decode()
        if input.expiresat == 0:
            secret.expiresat = None
        else:
            secret.expiresat = datetime.utcnow() + timedelta(minutes=input.expiresat)
        secret.maximumviews = input.maximumviews
        secret.currentviews = 0
        secret.save()
        secret.hash = create_hashid(secret.id)
        secret.save()
        return CreateSecret(secret=secret)


class Mutation(graphene.ObjectType):
    create_secret = CreateSecret.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
