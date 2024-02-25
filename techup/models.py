from techup import db
from datetime import datetime
from techup import db, login_manager
from flask import current_app
from flask_login import UserMixin
import jwt
import datetime as d


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    """
    Create New User
    """
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    image_file = db.Column(db.String(20),
                           nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    # posts = db.relationship('Post', backref='author', lazy=True)
    is_confirmed = db.Column(db.Boolean, nullable=False, default=False)
    confirmed_on = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

    def generate_reset_token(self, expiration=30):
        reset_token = jwt.encode(
                {
                    "confirm": self.id,
                    "exp": datetime.now(tz=d.timezone.utc)
                    + d.timedelta(seconds=expiration)
                    },
                current_app.config['SECRET_KEY'],
                algorithm="HS256"
                )
        return reset_token





    @staticmethod
    def verify_reset_token(token):
        try:
            data = jwt.decode(
                    token,
                    current_app.config['SECRET_KEY'],
                    leeway=d.timedelta(seconds=10),
                    algorithms=["HS256"]
                    )
        except Exception:
            return False
        return User.query.get(data.get("confirm"))
