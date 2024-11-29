from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    SECRET_KEY = os.environ['SECRET_KEY']
    SESSION_TYPE = 'filesystem'

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USE_SSL = True
    MAIL_PORT = '465'
    MAIL_USERNAME = 'thetrios2mc@gmail.com'
    MAIL_PASSWORD = 'rjpv zfks xnkv nrvv'

