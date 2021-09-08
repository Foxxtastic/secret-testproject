from pathlib import Path
import rsa


def create_keys():
    if Path("publickey.key").is_file() == False or Path("privatekey.key").is_file == False:
        publicKey, privateKey = rsa.newkeys(512)
        with open("publickey.key", "wb+") as pubkeyfile:
            pubkeyfile.write(publicKey.save_pkcs1("PEM"))
        with open("privatekey.key", "wb+") as prvkeyfile:
            prvkeyfile.write(privateKey.save_pkcs1("PEM"))
