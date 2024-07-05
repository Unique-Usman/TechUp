#!/usr/bin/python3


import os
from flask_mail import Message
from flask import render_template_string
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
#from itsdangerous import URLSafeTimedSerializer as Serializer
from api.v1 import mail, app
from models.user import User
from models import storage
import secrets
from PIL import Image


def send_confirm_email(email, token):
    confirm_url = f'http://localhost:5000/api/confirm-email?email={email}&token={token}'
    html = render_template_string(f'Click <a href="{confirm_url}">here</a> to confirm your email.')
    msg = Message('Confirm your email',
                  sender='noreply@demo.com',
                  recipients=[email], html=html)
    mail.send(msg)


def get_token(email, expires_sec=1800):
    s = Serializer(app.config['SECRET_KEY'], expires_sec)
    return s.dumps({'email': email}).decode('utf-8')


def verify_reset_token(token):
    s = Serializer(app.config['SECRET_KEY'])
    try:
        email = s.loads(token)['email']
    except Exception:
        return None
    return storage.get(User, email=email)[0]

# Image setup
def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, file_ext = os.path.splitext(form_picture.filename)
    picture_file_name = random_hex + file_ext
    picture_path = os.path.join(app.config['UPLOAD_FOLDER'], picture_file_name)

    os.makedirs(os.path.dirname(picture_path), exist_ok=True)

    output_size = (125, 125)
    image = Image.open(form_picture)
    image.thumbnail(output_size)
    image.save(picture_path)

    return picture_file_name
