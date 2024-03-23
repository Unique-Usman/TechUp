#!/usr/bin/python2
"""
For creating sqldatabase
instance to work with our website
"""

from models.engine.db_storage import DBStorage

# managing storage using sqlalchemy
storage = DBStorage()
storage.reload()
