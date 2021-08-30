from models.Base import Base
import pandas as pd
import numpy as np
from pandas_datareader.data import DataReader
from datetime import date
from sqlalchemy import Column, ForeignKey, Integer, String, Float, Table
from sqlalchemy.orm import relationship, backref
import uuid
from models.Relationship_UP import Relationship_UP
from models.Relationship_PA import Relationship_PA

class Portfolio(Base):
    """Class Portfolio"""
    __tablename__ = 'portfolio'
    portfolio_id = Column(String(60), primary_key = True)
    name = Column(String(100))
    risk = Column(Integer)
    total_available = Column(Float)


    def __init__(self, name, risk, total_available):
        """Init Method"""
        self.name = name
        self.risk = risk
        self.total_available = total_available
        self.assets = {}
        self.assets_composition = {}
        self.performance = {}
        self.portfolio_id = uuid.uuid4()
        self.performance_Flask = {}

    def make_assets_lists(self):
        """Generates ticker and weight lists"""
        ticker_list = []
        weight_list = []
        for key, value in self.assets.items():
            ticker_list.append(key)
            weight_list.append(value)
        return ticker_list, weight_list

    def get_data_API(self, start=date(2021,5,1), end=date.today()):
        '''Retrieves data from API'''
        tickers_list, _ = self.make_assets_lists()
        datos = DataReader(tickers_list, "yahoo", start, end)
        datos = datos["Adj Close"]
        self.performance['datos'] = datos
        self.performance['start'] = start
        self.performance['end'] = end

    def save_DataFrame(self, dataframe, start=date(2021,5,1), end=date.today(), ret_dates=[]):
        """Save Dataframe with prices of the assets between selected dates"""
        self.performance['datos'] = dataframe
        self.performance['start'] = start
        self.performance['end'] = end
        dates_list = []
        for date in ret_dates:
            dates_list.append(date.strftime("%b %d"))
        self.performance_Flask['ret_dates'] = dates_list
        # print("len de dates", len(dates_list))
        # print(self.performance_Flask['ret_dates']) 
        
    def calculate_available(self):
        """Calculates available cash of portfolio"""
        _, weigths = self.make_assets_lists()
        available = 1 - sum(weigths)
        self.performance['available'] = available

    def calculate_return(self):
        '''Calculates the return of the portfolio'''
        datos = self.performance.get('datos')
        start = self.performance.get('start')
        end = self.performance.get('end')
        
        #CUANDO USAMOS NUESTRA BASE DE DATOS NO ES NECESARIO LA MASCARA
        #df_portfolio = pd.date_range(start=start, end=end, freq="B")
        #mask1 = datos.index.isin(df_portfolio)
        datos_mensuales_port = datos#.loc[mask1]
        retornos_portfolio = datos_mensuales_port.pct_change().dropna()
        return retornos_portfolio

    def calculate_weighted_returns(self, retornos_portfolio):
        """Calculates weighted returns of portfolio"""
        _, weight_list = self.make_assets_lists()
        weighted_returns = (weight_list * retornos_portfolio)
        portfolio_weighted_returns = weighted_returns.sum(axis=1)
        return portfolio_weighted_returns

    def calculate_variation(self, bechmark_obj):
        """Generates dataframe with daily price variations"""
        port_ret = self.calculate_weighted_returns(self.calculate_return())
        bench_ret = bechmark_obj.calculate_weighted_returns(
            bechmark_obj.calculate_return())
        df_variacion = pd.concat([port_ret, bench_ret], axis=1)
        df_variacion.columns = ["Portafolio", "Benchmark"]
        return df_variacion

    def calculate_sharpe(self, bechmark_obj):
        """Calculates sharpe ratio of portfolio"""
        annual_sharpe_dict = {}
        df_variacion = self.calculate_variation(bechmark_obj)
        sharpe_port = df_variacion['Portafolio'].mean(
        ) / df_variacion['Portafolio'].std()
        sharpe_bech = df_variacion['Benchmark'].mean(
        ) / df_variacion['Benchmark'].std()
        anual_sharpe_port = ((252**0.02) * sharpe_port) * 10
        anual_sharpe_bech = ((252**0.02) * sharpe_bech) * 10
        annual_sharpe_dict['Portfolio'] = anual_sharpe_port
        annual_sharpe_dict['Benchmark'] = anual_sharpe_bech
        data = pd.Series(data=annual_sharpe_dict, index=[
                         "Portfolio", "Benchmark"])
        data = round(data,2)
        self.performance['sharpe'] = data
        self.performance_Flask['sharpe'] = data.to_dict()

    def calculate_downside_risk(self, bechmark_obj):
        """Calculates downside risk of portfolio"""
        df_variaciones = self.calculate_variation(bechmark_obj)
        target_return = 0
        # me arma dataframe solo con variaciones negativas
        df_negativos = df_variaciones[df_variaciones < target_return]
        df_negativos = df_negativos.fillna(0)  # me cambia los NaN por 0
        downside_risk = df_negativos.std() * np.sqrt(252) * 100
        downside_risk = round(downside_risk,2)
        self.performance['downside_risk'] = downside_risk
        self.performance_Flask['downside_risk'] = downside_risk.to_dict()

    def calculate_drawdown(self, bechmark_obj):
        """Calculate drawdown of the portfolio"""
        port_ret = self.calculate_weighted_returns(self.calculate_return())  # eliminar redundancia
        bench_ret = bechmark_obj.calculate_weighted_returns(bechmark_obj.calculate_return())  # eliminar redundancia
        crec_port = (1 + port_ret).cumprod()*100  # eliminar redundancia
        crec_bench = (1 + bench_ret).cumprod()*100  # eliminar redundancia
        crecimientos = pd.concat([crec_port, crec_bench], axis=1)# eliminar redundancia
        crecimientos.columns = ["Portafolio",
                                "Benchmark"]  # eliminar redundancia
        self.performance['crecimientos'] = crecimientos
        
        rolling_max = crecimientos.rolling(
            min_periods=1, window=12).max()  # me agarra el maximo
        monthly_drawdown = crecimientos / rolling_max - 1
        monthly_drawdown * 100
        drawdowns = monthly_drawdown.min() * 100
        drawdowns = round(drawdowns,2)
        self.performance['drawdown'] = drawdowns
        self.performance_Flask['drawdown'] = drawdowns.to_dict()
        
        array_port = crecimientos['Portafolio'].values.tolist()
        array_bench = crecimientos['Benchmark'].values.tolist()

        for index, element in enumerate(array_port):
            array_port[index] = round(element, 2)
        
        for index, element in enumerate(array_bench):
             array_bench[index] = round(element, 2)

        self.performance_Flask['ret_portfolio'] = array_port
        self.performance_Flask['ret_benchmark'] = array_bench

    def calculate_annual_returns(self, bechmark_obj):
        """Calculates annual return of portfolio"""
        crecimientos = self.performance['crecimientos']
        ultimo = crecimientos.iloc[-1]
        primero = crecimientos.iloc[0]
        returns = ((ultimo - primero) - 1)
        ann_returns = (1 + returns/100).pow(252/len(crecimientos))-1
        ann_returns = round((ann_returns * 100),2)
        self.performance['returns'] = ann_returns
        self.performance_Flask['returns'] = ann_returns.to_dict()

    def calculate_volatility(self, bechmark_obj):
        """Calculates Volatility of the portfolio"""
        df_variaciones = self.calculate_variation(bechmark_obj)
        volatility = df_variaciones.std()*np.sqrt(252)
        volatility = volatility * 100
        volatility = round(volatility,2)
        self.performance['volatility'] = (volatility)
        self.performance_Flask['volatility'] = (volatility).to_dict()

    def add_performance(self, benchmark_obj):
        """Adds functions values to the performance dict"""
        self.calculate_available()
        self.calculate_sharpe(benchmark_obj)
        self.calculate_volatility(benchmark_obj)
        self.calculate_drawdown(benchmark_obj)
        self.calculate_downside_risk(benchmark_obj)
        self.calculate_annual_returns(benchmark_obj)   


