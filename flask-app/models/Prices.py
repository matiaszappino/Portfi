from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table, Date
from sqlalchemy.orm import backref, relationship
from models.Base import Base


class Price(Base):
    '''Class Historical Prices'''
    __tablename__ = 'prices'
    ticker = Column(String(20), ForeignKey('assets.ticker'), primary_key=True)
    date = Column(Date)
    price = Column(Float)
    
    relation = relationship("Asset")

    def __init__(self, **kwargs):
        if kwargs:
            for key, value in kwargs.items():
                #if key != "__class__":
                setattr(self, key, value)
