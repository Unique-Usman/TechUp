"""
Forms used in the project
"""
from flask_wtf import (FlaskForm)
from flask_wtf.file import (FileField, FileAllowed)
from wtforms import (StringField, PasswordField, SubmitField, BooleanField)
from wtforms.validators import (DataRequired, Length, Email,
                                EqualTo, ValidationError)
from flask_login import current_user
from techup.models import User


class RegistrationForm(FlaskForm):
    """
    This class is for Registration Form.
    """
    username = StringField("Username",
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField("Confirm Password",
                                     validators=[DataRequired(),
                                                 EqualTo("password")])
    # picture = FileField("Upload Profile Picture",
    #                     validators=[FileAllowed(["jpg", "png"])])
    submit = SubmitField("Create Account")

    def validate_username(self, username):
        """
        Validate the User name
        """
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError("That username is taken. Please choose another one")

    def validate_email(self, email):
        """
        Validate the Password
        """
        email = User.query.filter_by(email=email.data).first()
        if email:
            raise ValidationError("That email is taken. Please choose another one")


class LoginForm(FlaskForm):
    """
    The login Form
    """
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me") 
    submit = SubmitField("Login")   
