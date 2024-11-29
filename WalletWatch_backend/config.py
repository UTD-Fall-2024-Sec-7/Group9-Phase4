from dotenv import load_dotenv
import os
import redis

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ['SECRET_KEY']
    SESSION_TYPE = 'filesystem'
    # SESSION_PERMANENT = False
    # SESSION_USE_SIGNER = True
    # SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USE_SSL = True
    MAIL_PORT = '465'
    MAIL_USERNAME = 'thetrios2mc@gmail.com'
    MAIL_PASSWORD = 'rjpv zfks xnkv nrvv'

