import os
import secrets
from PIL import Image
from flask import url_for, current_app
from flask_mail import Message
from techup import mail

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(current_app.root_path, "static/profile_pics", picture_fn)

    output_size = (125, 125)
    i = image.open(form_picture)
    i.thumbnail(output_size)

    i.save(picture_path)
    
    return picture_fn

def send_reset_email(user):
    token = user.generate_reset_token()
    msg = message("password reset request",
                  sender="noreply@demo.com",
                  recipients=[user.email])

    msg.body = f"""to reset your passord, visit the following link:
        {url_for("users.reset_token", token=token, _external=true)}

    if you did not make this request then simply ignore this mail and no changes will be made
    """
    mail.send(msg)
