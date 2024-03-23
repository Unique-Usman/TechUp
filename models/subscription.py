#!/usr/bin/python3
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Float, Integer, String, ForeignKey
"""The class for subscriptions"""


class Subscription(BaseModel, Base):
    """The subscriptions class"""

    __tablename__ = "subscriptions"

    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
    opportunity_type_id = Column(String(60), ForeignKey("opportunity_type.id"), nullable=False)
