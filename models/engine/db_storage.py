"""
The database storage
"""
from os import getenv
from sqlalchemy import create_engine, MetaData
from models.base_model import Base
from models.user import User
from models.opportunities import Opportunity
from models.opportunity_type import Opportunity_type
from sqlalchemy.orm import sessionmaker, scoped_session
from os import getenv

models = [User, Opportunity, Opportunity_type]


class DBStorage:
    """
    Database storage engine for alchemy
    """

    __engine = None
    __session = None

    def __init__(self):
        usr = getenv("HBNB_MYSQL_USER")
        pwd = getenv("HBNB_MYSQL_PWD")
        host = getenv("HBNB_MYSQL_HOST")
        db = getenv("HBNB_MYSQL_DB")
        env = getenv("HBNB_ENV")

        self.__engine = create_engine(
            f"mysql+mysqldb://{usr}:{pwd}@{host}/{db}",
            pool_pre_ping=True,
        )

        if env == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None, id=None):
        """
        Query all classes or specific one by ID
        """
        result = {}
        for clss in models:
            if cls is None or cls is clss:
                objs = self.__session.query(clss).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    result[key] = obj
        return (result)

    def new(self, obj) -> None:
        """
        Add new object to the database
        """
        if obj:
            self.__session.add(obj)

    def delete(self, obj=None) -> None:
        """
        delete an object from the database
        """
        if obj:
            self.__session.delete(obj)

    def reload(self):
        Base.metadata.create_all(bind=self.__engine)
        Session = scoped_session(
                sessionmaker(bind=self.__engine,
                             expire_on_commit=False)
                )
        self.__session = Session()

    def save(self) -> None:
        """
        save the session
        """
        self.__session.commit()

    def search(self, cls, id):
        """
        Search for an object of a specific class by ID
        """
        return self.all(cls, id)

    def close(self):
        """
        Close the current database session
        """
        self.__session.close()

    def get(self, cls, **kwargs):
        """
        A method to retrieve an Object by
        cls and any kwarg
        """
        for key, value in kwargs.items():
            if key == "id":
                objs = self.__session.query(cls).filter_by(id=value).first()
            else:
                objs = self.__session.query(cls).filter_by(
                        **{key: value}).all()
        return objs

    def count(self, cls=None):
        """
        Returns all the number of object in a cls
        If the class does not exist, it returns all
        the object in the storage
        """
        if cls:
            objs = self.__session.query(cls).all()
            return len(objs)

        count = 0
        for clss in models:
            objs = self.__session.query(clss).all()
            count += len(objs)

        return count
