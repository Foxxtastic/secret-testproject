from hashids import Hashids
hashids = Hashids(min_length=6, alphabet='abcdefghijklmnopqrs123456789')


def create_hashid(id: int):
    hashid = hashids.encode(id)
    return hashid
