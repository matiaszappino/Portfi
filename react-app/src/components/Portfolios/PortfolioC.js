import React from 'react'
import "../main/Main.css";

const PortfolioC = () => {
  return (
    <main>
      <div className="main__container">
        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Monthly Performance</h1>
                <p>For testing purposes</p>
              </div>
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>For testing purposes</p>
              </div>
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Balance</h1>
                <p>$254,00</p>
              </div>

              <div className="card2">
                <h1>Returns</h1>
                <p>$124,200</p>
              </div>

              <div className="card3">
                <h1>Performance</h1>
                <p>150%</p>
              </div>

              <div className="card4">
                <h1>Risk</h1>
                <p>High</p>
              </div>
            </div>
          </div>
          <div className="charts__left">
          <div className="charts__left__title">
              <div>
                <h1>Monthly Performance</h1>
                <p>For testing purposes</p>
              </div>
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>For testing purposes</p>
              </div>
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Balance</h1>
                <p>$254,00</p>
              </div>

              <div className="card2">
                <h1>Returns</h1>
                <p>$124,200</p>
              </div>

              <div className="card3">
                <h1>Performance</h1>
                <p>150%</p>
              </div>

              <div className="card4">
                <h1>Risk</h1>
                <p>High</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PortfolioC;
