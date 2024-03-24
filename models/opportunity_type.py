#!/usr/bin/python3
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

"""The opportunity_type class which represent all the possible opporunities"""


class Opportunity_type(BaseModel, Base):
    """ The opportunity_type """

    __tablename__ = "opportunity_type"
    name = Column(String(128), nullable=False)
