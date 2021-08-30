from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table
from sqlalchemy.orm import backref, relationship
from models.Base import Base


class Relationship_UP(Base):
    '''Class relationship User-Porfolios'''
    __tablename__ = 'relationship_up'
    user_id = Column(String(60), ForeignKey('users.user_id'), primary_key=True)
    portfolio_id = Column(String(60), ForeignKey('portfolio.portfolio_id'), primary_key=True)
    relation = relationship("User")

    def __init__(self, portafolio_id, user_id):
          self.user_id = user_id
          self.portfolio_id = portafolio_id


