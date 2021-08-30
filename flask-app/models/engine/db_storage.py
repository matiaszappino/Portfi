#!/usr/bin/python3
"""
Contains the class DBStorage
"""
import pandas as pd
from sqlalchemy import create_engine, select
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from models import User, Portfolio, Asset
from models.Asset import Asset
from models.User import User
from models.Portfolio import Portfolio
from models.Relationship_PA import Relationship_PA
from models.Relationship_UP import Relationship_UP
from models.Relationship_ETF import Relationship_ETF
from models.Prices import Price
import models
from models.Base import Base

classes = {"Asset": Asset, "Portfolio": Portfolio, "User": User}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format('portfi_dev',
                                             'PortfiPass1!',
                                             'localhost',
                                             'portfi'))

    def all(self, cls=None):
        """Query on the current database session"""
        objs = self.__session.query(cls)
        return objs

    def new(self, obj):
        """Add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current database session"""
        self.__session.commit()

    def reload(self):
        """Reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """Call remove() method on the private session attribute"""
        self.__session.remove()

    def get_dataFrame(self,ticker_list, start, end):
        """Builds dataframe from data from API"""
        dates = []
        SQLquery = select(Price.date, Price.price, Price.ticker).where(
                Price.ticker == ticker_list[0]).filter(Price.date >= start, Price.date <= end)
        objetos = self.__session.execute(SQLquery)
        for o in objetos.all():
            dates.append(o.date)
        prices = []
        dataFrame = pd.DataFrame(index=dates)
        dataFrame.index.name = "Date"
        for ticker in ticker_list:
            SQLquery = select(Price.date, Price.price, Price.ticker).where(
                Price.ticker == ticker).filter(Price.date >= start, Price.date <= end)
            objetos = self.__session.execute(SQLquery)
            prices = []
            for o in objetos.all():
                prices.append(o.price)
            dataFrame[o.ticker] = prices
        #print(dataFrame)
        return dataFrame, dates
        
    def get_object(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls is User:
            objeto = self.__session.query(cls).filter_by(user_id=id).first()
            return objeto
        if cls is Asset:
            objeto = self.__session.query(cls).filter_by(asset_id=id).first()
            return objeto
        if cls is Portfolio:
            objeto = self.__session.query(
                cls).filter_by(portfolio_id=id).first()
            assetts_obj = self.__session.query(
                Relationship_PA).filter_by(portfolio_id=id)
            new_dict = {}
            for obj in assetts_obj:
                new_dict[obj.ticker] = obj.weight
            objeto.assets = new_dict
            objeto.performance = {}
            objeto.assets_composition = {}
            objeto.performance_Flask = {}
            return objeto

        return None

    def get_ticker(self, ticker):
        """Retrieves object from DB using the ticker symbol"""
        try:
            objeto = self.__session.query(
                Asset).filter_by(ticker=ticker).first()
            return objeto
        except:
            return None

    def calculate_composition2(self):
        """Calculate Composition of the Portfolio"""
        bonds = 0
        stocks = 0
        cash = 0
        etf_stocks = 0
        for ticker, weight in models.portfolio.assets.items():
            obj = self.get_ticker(ticker)
            if obj.asset_type == "ETF":
                etf_obj = self.__session.query(
                    Relationship_ETF).filter_by(ticker=ticker).first()
                bonds += etf_obj.bond * weight
                etf_stocks += etf_obj.stock * weight
            elif obj.asset_type == "EQUITY":
                stocks += weight
            total_stocks = stocks + etf_stocks
            cash = 1 - (total_stocks + bonds)
            models.portfolio.performance['bonds'] = bonds
            models.portfolio.performance['stocks'] = total_stocks
            models.portfolio.performance['cash'] = cash

    def calculate_composition(self, portfolio):
        """Calculate Composition of the Portfolio"""
        bonds = 0
        stocks = 0
        cash = 0
        etf_stocks = 0
        for ticker, weight in portfolio.assets.items():
            obj = self.get_ticker(ticker)
            if obj.asset_type == "ETF":
                etf_obj = self.__session.query(
                    Relationship_ETF).filter_by(ticker=ticker).first()
                bonds += etf_obj.bond * weight
                etf_stocks += etf_obj.stock * weight
            elif obj.asset_type == "EQUITY":
                stocks += weight
            total_stocks = stocks + etf_stocks
            cash = 1 - (total_stocks + bonds)
            portfolio.performance['bonds'] = bonds
            portfolio.performance['stocks'] = total_stocks
            portfolio.performance['cash'] = cash

    def save_data(self, main_portfolio, user_obj):
        '''Save assets in MySQL table'''
        storage = DBStorage()
        storage.reload()
        for ticker, weight in main_portfolio.assets.items():
            relation_PA = Relationship_PA(
                main_portfolio.portfolio_id, ticker, weight).first()
            storage.new(relation_PA)
        relation_UP = Relationship_UP(
            main_portfolio.portfolio_id, user_obj.user_id).first()
        storage.new(relation_UP)
        storage.save()
        storage.close()

    def rollback_function(self):
        """Session rollback"""
        self.__session.rollback()

    def calculate_asset_composition(self, ticker, weight):
        """Calculate Composition of the Asset"""
        stocks = 0
        bonds = 0
        obj = self.get_ticker(ticker)
        if obj.asset_type == "ETF" and obj != None:
            try:
                etf_obj = self.__session.query(
                    Relationship_ETF).filter_by(ticker=ticker).first()
                bonds = etf_obj.bond * weight
                stocks = etf_obj.stock * weight
            except:
                pass
        elif obj.asset_type == "EQUITY" and obj != None:
            stocks = weight

        asset_composition = {'bonds': bonds, 'stocks': stocks}
        models.portfolio.assets_composition[ticker] = asset_composition
