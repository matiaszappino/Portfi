#!/usr/bin/python3
"""Script that starts a Flask web application"""
from flask.helpers import make_response
from models.Portfolio import Portfolio
from flask import Flask, jsonify
from flask import render_template
from flask import request
#from models.engine.db_storage import DBStorage
#from models import storage
from datetime import datetime
import models as models
from flask_cors import CORS

app = Flask(__name__)
"""storage = DBStorage()"""
cors = CORS(app, resources={r"/portfolio/*": {"origins": "*"}})

@app.route('/portfolio', methods=["GET", "POST"], strict_slashes=False)
def dashboard_form():
    models.portfolio.calculate_available()
    calculate_asset_compostion()
    portfolio_summary = summary_dict()
    list_of_portfolio = [value for value in portfolio_summary.values()]
    return jsonify(list_of_portfolio)


def summary_dict():
    porti = {}
    for ticker, weight in models.portfolio.assets.items():
        asset_object = models.storage.get_ticker(ticker)
        portfolio_summary = {}
        portfolio_summary['ticker'] = ticker
        portfolio_summary['weigth'] = weight
        portfolio_summary['composition'] = models.portfolio.assets_composition[ticker]
        try:
            portfolio_summary['name'] = asset_object.name
        except:
            portfolio_summary['name'] = "Not Found on Data Base"
        if portfolio_summary['name'] != "Not Found on Data Base":
            porti[ticker] = portfolio_summary
    return porti


def verify_input():
    """Verifies the Input of the User"""
    weight = 0.0
    try:
        ticker = request.form.get("ticker").upper()
        if ticker == None:
            return None, None, None, None
        weight = float(request.form.get("weight"))
    except:
        return None, None, None, None

    start = request.form.get('start')
    end = request.form.get('end')
    start = datetime.strptime(start, '%Y-%m-%d')
    end = datetime.strptime(end, '%Y-%m-%d')
    if (end < start) or (start > end) or (end > datetime.today()):
        return None, None, None, None
    return ticker, weight, start, end

def verify_weight(ticker, weight, assets):
    '''verfify that weight do not exceed 100%'''
    total = 0
    if weight <= 0:
        return False
    for value in assets.values():
        total += value
    if total + weight <= 1:
        models.portfolio.assets[ticker] = weight
        models.storage.calculate_asset_composition(ticker, weight)
        total += weight
        return True
    return False

def calculate_asset_compostion():
    for ticker, weight in models.portfolio.assets.items():
        models.storage.calculate_asset_composition(ticker, weight)


@app.teardown_appcontext
def close_db(error):
    """close db session"""
    models.storage.close()


@app.errorhandler(404)
def not_found(error):
    """404 error"""
    return make_response(jsonify({'error': "Not found"}), 404)


@app.route('/composition', strict_slashes=False)
def composition():
    models.storage.calculate_composition2()
    portfolio_composition = {}
    portfolio_composition['bonds'] = models.portfolio.performance['bonds']
    portfolio_composition['stocks'] = models.portfolio.performance['stocks']
    portfolio_composition['cash'] = models.portfolio.performance['cash']
    return jsonify(portfolio_composition)


@app.route('/returnTicker', strict_slashes=False, methods=["POST"])
def returnTicker():
    try:
        jsonData = request.get_json()
        ticker = jsonData["ticker"].upper()
        weight = float(jsonData["weight"])
        if ticker == None or weight <= 0:
            return None
        else:
            if verify_weight(ticker, weight, models.portfolio.assets):
                models.portfolio.calculate_available()
                portfolio_summary = summary_dict()
                list_of_portfolio = [value for value in portfolio_summary.values()]
                return jsonify(list_of_portfolio)
    except Exception as error:
        #return error
        pass
    finally:
        return "OK"

@app.route('/deleteTicker', strict_slashes=False, methods=["POST"])
def DeleteTicker():
    try:
        jsonData = request.get_json()
        ticker = jsonData["ticker"].upper()
        if ticker == None:
            return None
        else:
            models.portfolio.assets.pop(ticker)
            models.portfolio.calculate_available()
            portfolio_summary = summary_dict()
            list_of_portfolio = [value for value in portfolio_summary.values()]
            return jsonify(list_of_portfolio)
    except Exception as error:
        #return error
        pass
    finally:
        return "OK"

@app.route('/calculatePortfi', strict_slashes=False, methods=["POST"])
def calculus():
    try:
        jsonData = request.get_json()
        start = jsonData['startDate']
        end = jsonData['endDate']
        start = datetime.strptime(start, '%Y-%m-%d')
        end = datetime.strptime(end, '%Y-%m-%d')
        if (end < start) or (start > end) or (end > datetime.today()):
            return None
        portfolio, benchmark = asing_Assets(jsonData['dataFiltrada'])
        portfolio.calculate_available()
        
        ############# LLAMADA A LA API #####################################
        # portfolio.get_data_API(start, end)
        # benchmark.get_data_API(start, end)
        
        ############# LLAMADA A NUESTRA BASE DE DATOS ######################
        port_ticker, _ = models.portfolio.make_assets_lists()
        portfolio_df, dates_a = models.storage.get_dataFrame(port_ticker,start,end)
        portfolio.save_DataFrame(portfolio_df, start, end, dates_a)
        bench_ticker, _ = benchmark.make_assets_lists()
        bechmarck_df, dates_a = models.storage.get_dataFrame(bench_ticker, start, end)
        benchmark.save_DataFrame(bechmarck_df, start, end, dates_a)
        ####################################################################
        
        portfolio.add_performance(benchmark)
        # print(portfolio.performance_Flask)
        return jsonify(portfolio.performance_Flask)
    finally:
        pass


def asing_Assets(portfolio_list):
    portfolio = Portfolio("portfi", 5, 0)
    bechmarck = Portfolio("bench", 0, 0)
    for asset_dict in portfolio_list:
        ticker = asset_dict['ticker']
        weight = asset_dict['weigth']
        portfolio.assets[ticker] = weight
    models.storage.calculate_composition(portfolio)
    weight_bonds = portfolio.performance['bonds']
    weight_cash = portfolio.performance['cash']
    weight_stocks = portfolio.performance['stocks']
    if weight_bonds != 0:
        bechmarck.assets['AGG'] = weight_bonds
    if weight_cash != 0:
        bechmarck.assets['SGOV'] = weight_cash
    if weight_stocks != 0:
        bechmarck.assets['ACWI'] = weight_stocks
    return portfolio, bechmarck


