<h1 align="center">
PORTFI - MVP version
</h1>

<p align="center">Your portfolio and risk analysis software</p>

  Portfi provides a detailed analisis on a customizable stock portfolio provided by the user. Our application offers some of the most relevant tools that high price applications offer while being free to use and maintaining a nice user-friendly experience.

<h3>Inspiration</h3>

More and more people are everyday thinking of a way to live with passive income. Investing in big companies has always been a low-risk go to strategy for this, but the problem we found is that the tools to make do this are very expensive and don't even provide user-friendly UIs, which makes investing in these markets a very discouraging experience. Our goal is to be able to provide a free tool that everybody can use to start building a portfolio with a decent investment strategy.

<h3>Features</h3>

- Ability to add main equities, stock, and ETF, traded in NYSE and NASDAQ markets.
- Historic analysis of the stocks provided by the user.
- Comparison of portfolios against main ratios and market benchmarks.
- Visualization of traditional metrics such as risk, correlations, volatility, max drawdown, return, sharp (efficiency), and all in different time frames.
- User friendly graphic representations of these metrics and actives.
- Portfolio optimization according to the investor profile.
- Analysis with tools such as positioning and valuation of shares (P/E).

<h3>Technology</h3>

PORTFI uses a number of open source projects to work properly:

- [Python](https://www.python.org/) - interpreted high-level general-purpose programming language.
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) - micro web framework written in Python.
- [ReactJS](https://reactjs.org/) - open-source front-end JavaScript library.
- [Material UI](https://material-ui.com/) - react component library built by Google.
- [MySQL](https://www.mysql.com/) - open-source relational database management system.
- [SQLAlchemy](https://www.sqlalchemy.org/) - open-source SQL toolkit and object-relational mapper for Python.
- [pandas](https://pandas.pydata.org/) - open source data analysis and manipulation tool.

<h3>Architecture</h3>


<img src="https://i.imgur.com/s25672S.png">


<h3>Installation</h3>

PORTFI requires several technologies to be installed in order to run, this is why we recommend you to use it on our deployed live version when we deploy it (soon).
If you still would like to run it for yourself, follow the steps below:

- Install the necessary software (paste everything into a script and run it):

```
#!/bin/bash
sudo apt-get update
sudo apt-get install emacs -y
sudo apt-get install git -y
sudo apt-get install python3 -y
sudo apt install python3-pip -y
sudo pip3 install Flask
echo 'deb http://repo.mysql.com/apt/ubuntu/ trusty mysql-5.7-dmr' | sudo tee -a /etc/apt/sources.list
sudo apt-get install mysql-server-5.7 -y
sudo apt-get install python3-dev -y
sudo apt-get install libmysqlclient-dev -y
sudo apt-get install zlib1g-dev -y
sudo pip3 install mysqlclient==1.3.10
sudo pip3 install SQLAlchemy==1.2.5
sudo pip3 install pathlib2
sudo apt-get install -y python3-lxml -y
sudo pip3 install flask_cors
sudo pip3 install flasgger
sudo apt-get install python3-pandas -y
sudo pip3 install pandas-datareader
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

After all of the above dependancies are installed:

- Clone this repository ```git clone https://github.com/gdorelo/PORTFI.git ```
- ```cd``` into the PORTFI folder
- Setup the database wih ```cat flask-app/models/sql/setup_mysql.sql | mysql -u root -p```
- Polulate the database with ```cat flask-app/models/sql/last_db.sql | mysql -u root -p```
- Export the Flask global variable ```cd flask-app``` then ```export FLASK_APP=web.app```
- Run the back-end ```flask run```
- Open a new terminal and run ```cd react-app``` and  ```npm install``` to install React dependancies
- Run the front-end ```npm start```

NPM should automatically open a new browser page on localhost:3000/ where PORTFI is running. If this page isn't opened, just copy and paste localhost:3000/ into your browser and press enter.

![gif1](https://i.imgur.com/c7U9Lp1.gif)

![gif2](https://i.imgur.com/D6yh5dc.gif)


Enjoy!

<h4>Authors</h4>

**Gianluca Dorelo** https://github.com/gdorelo

**Martin Saavedra** https://github.com/martinmsaavedra/

**Matias Zappino** https://github.com/matiaszappino/


<h3>Contributors</h3>

**Nicolas Ribeiro** https://github.com/nikolasribeiro
