#!usr/bin/python3
import uuid
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
import models
from os import getenv

# This module  which define base class for all the subclass
# in this TechUp Project. Other classes are
# User, Opportunities, Opportunity_type etc.

Base = declarative_base()
storage_type = getenv("HBNB_TYPE_STORAGE")

class BaseModel:
    """This the base class for other class

    Other classed Inherit from the base class. It defines Instance
    Like id, created_at, updated_at etc.
    """

    id = Column(String(60), primary_key=True,
                nullable=False, unique=True)
    created_at = Column(DateTime,
                        nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime,
                        nullable=False, default=datetime.utcnow(),
                        onupdate=datetime.utcnow)

    def __init__(self, *args, **kwargs) -> None:
        """To initialize the BaseModel Class

        If the args or kwargs is present and not empty then, the instance initialization
        is done with either of the args of kwargs, while if it is empty, the initialization
        is done by randomly generating the value for those instance using
        datetime module and uuid module.

        Args:
            args (tuple): list representation of an instance i.e it attributes
            kwargs (dict): dict representation of an instance i.e it attributes
        """

        if kwargs is None or len(kwargs) == 0:
            self.id = str(uuid.uuid4())
            current_time = datetime.now()
            self.created_at = current_time
            self.updated_at = current_time
        else:
            for key in kwargs.keys():
                if key == "__class__":
                    continue
                elif key == "created_at":
                    self.created_at = datetime.strptime(kwargs[key],
                                                        "%Y-%m-%dT%H:%M:%S.%f")
                elif key == "updated_at":
                    self.updated_at = datetime.strptime(kwargs[key],
                                                        "%Y-%m-%dT%H:%M:%S.%f")
                else:
                    setattr(self, key, kwargs.get(key))
                self.id = str(uuid.uuid4())

    def __str__(self) -> str:
        """It return the string representation of the Obj of the Class

        Returns:
            str: [<class name>] (<self.id>) <self.__dict__>
        """
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def save(self) -> None:
        """Updates the public instance attribute updated_at with current datetime"""
        self.updated_at = datetime.now()
        models.storage.new(self)
        models.storage.save()

    def delete(self) -> None:
        """
        Delete the current instance from the storage
        """
        models.storage.delete(self)

    def to_dict(self) -> dict:
        """It returns the dict representation of the class

        Args:
            dict: The dictionary representation of the class
        """
        rdic = self.__dict__.copy()
        rdic["__class__"] = self.__class__.__name__
        rdic["updated_at"] = self.updated_at.isoformat(sep='T', timespec='microseconds')
        rdic["created_at"] = self.created_at.isoformat(sep='T', timespec='microseconds')
        if "_sa_instance_state" in rdic:
            del rdic["_sa_instance_state"]
        if storage_type == "db" and self.__class__.__name__ == "User":
            del rdic["password"]
        return rdic
