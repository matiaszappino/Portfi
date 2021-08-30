from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table
from sqlalchemy.orm import backref, relationship
from models.Base import Base


class Relationship_PA(Base):
    '''Class relationship Portfolio-Asset'''
    __tablename__ = 'relationship_pa'
    portfolio_id = Column(String(50), ForeignKey('portfolio.portfolio_id'), primary_key=True)
    ticker = Column(String(20), ForeignKey('assets.ticker'), primary_key=True)
    weight = Column(Float)
    relation = relationship("Portfolio")

    def __init__(self, portafolio_id, ticker, weight):
        self.weight = weight
        self.portfolio_id = portafolio_id
        self.ticker = ticker



