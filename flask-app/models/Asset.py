from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean
import uuid
from models.Base import Base
from sqlalchemy.orm import relationship, backref


class Asset(Base):
    """Class Portfolio"""
    __tablename__= 'assets'
    name = Column(String(250))
    ticker = Column(String(20), primary_key = True, index=True)
    asset_type = Column(String(100))
    asset_id = Column(Integer)
    exchange = Column(String(50))
    sector = Column(String(100))
    
    def __init__(self, **kwargs):
        """Init Method"""
        if kwargs:
            for key, value in kwargs.items():
                setattr(self, key, value)
