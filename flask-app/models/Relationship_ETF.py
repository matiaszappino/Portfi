from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table
from sqlalchemy.orm import backref, relationship
from models.Base import Base


class Relationship_ETF(Base):
    '''Class relationship ETF-Positions'''
    __tablename__ = 'relationship_etf'
    ticker = Column(String(20), ForeignKey('assets.ticker'), primary_key=True)
    bond = Column(Float)
    stock = Column(Float)
    relation = relationship("Asset")

    def __init__(self, **kwargs):
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
