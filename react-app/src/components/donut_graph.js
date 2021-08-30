import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import { PortfiContext } from './context/portfiContext';

export const Donut = () => {
  const { compositionData } = useContext(PortfiContext)
  const [ charData, setChartData] = useState([])
  let [bonds, setBonds] = useState(parseFloat(0.0))
  let [stocks, setStocks] = useState(parseFloat(0.0))
  let [cash, setCash] = useState(parseFloat(100.0))

  useEffect ( () => {
    let rawChartData = []
    let ticker = ""
    let composition = {}
    let asset = {}
    for (let i = 0; i < compositionData.length; i++){
        ticker = compositionData[i].ticker;
        composition = compositionData[i].composition;
        asset[ticker] = composition;
        rawChartData.push(asset[ticker])
        //console.log("raw",rawChartData)
      };
    setChartData(rawChartData)
    //console.log("Chart Data", charData)
    let stocks_ = 0
    let bonds_ = 0
    let cash_ = 0
    charData.map( (data) => {
      stocks_ = stocks_ + (data.stocks * 100)
      bonds_ = bonds_ + (data.bonds * 100) 
      //console.log("St",stocks_)
      //console.log("Bd",bonds_)
    })
    cash_ = (100 -  (bonds_ + stocks_))
    setCash(cash_)
    //console.log("cash", cash_)
    setBonds(bonds_);
    setStocks(stocks_);
    setEstado({...estado, series:[parseFloat(bonds), parseFloat(cash), parseFloat(stocks)]})
    //console.log(estado)
  }, [compositionData, cash]);

  
  const [estado, setEstado] = useState(
    {
      options: {
        labels: ['Bonds', 'Cash', 'Stocks']
      },
      series: [bonds ,cash, stocks]
    })
    
    const { options, series } = estado
    
  

  return (
  <Chart 
  options={options}
  series={series? series:series} 
  type="donut" 
  width="380" />
  )
}
