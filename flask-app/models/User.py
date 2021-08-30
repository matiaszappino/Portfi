#!/usr/bin/python3
'''User Module'''
from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean
import uuid
from models.Base import Base

class User(Base):
    '''User Class'''
    __tablename__ = 'users'
    user_id = Column(String(60), primary_key = True)
    name = Column(String(100))
    email = Column(String(100))
    password = Column(String(100))

    def __init__(self, name='Default', email='Default', password='Default'):
        self.user_id = uuid.uuid4()
        self.name = name
        self.email = email
        self.password = password

