#!/usr/bin/python3
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, BLOB, ForeignKey, delete
from os import getenv
from sqlalchemy.orm import backref, relationship
# from models.place import Place
# from models.city import City
import hashlib

"""The user class that inherit from the BaseModel

The user class represents the User of the TechUp
"""

storage_type = getenv("HBNB_TYPE_STORAGE")

class User(BaseModel, Base):
    """User class which inherit from BaseModel"""
    
    __tablename__ = "users"

    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    first_name = Column(String(128), nullable=True)
    last_name = Column(String(128), nullable=True)
    github = Column(String(256), nullable=True)
    twitter = Column(String(256), nullable=True)
    picture = Column(BLOB)

    def __init__(self, *args, **kwargs):
        """
        instantiates user object
        """
        if kwargs:
            pwd = kwargs.pop('password', None)
            if pwd:
                User.__set_password(self, pwd)
        super().__init__(*args, **kwargs)

    def __set_password(self, pwd):
        """
        custom setter: encrypts password to MD5
        """
        secure = hashlib.md5()
        secure.update(pwd.encode("utf-8"))
        secure_password = secure.hexdigest()
        setattr(self, "password", secure_password)
