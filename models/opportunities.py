#!/usr/bin/python3
from models.base_model import BaseModel, Base
from sqlalchemy import (Column, String, BLOB, Integer,
                        ForeignKey, delete, DateTime, Enum
                        )
from sqlalchemy.orm import backref, relationship
from datetime import datetime
# from models.place import Place
# from models.city import City

"""The opportunities class that inherit from the BaseModel

"""


class Opportunity(BaseModel, Base):
    """Opportunity class which inherit from BaseModel"""
    
    __tablename__ = "opportunities"

    title = Column(String(256), nullable=False)
    link = Column(String(256), nullable=False)
    deadline = Column(DateTime,
                        nullable=False, default=datetime.utcnow())
    status = Column(Enum('open', 'close'))
    user_id = Column(String(60), ForeignKey('users.id'))
    opportunity_type_id = Column(String(60), ForeignKey('opportunity_type.id'))
    description = Column(String(256), nullable=True)
    upvote = Column(Integer)
    downvote = Column(Integer)
