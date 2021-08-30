import React, { useState, useEffect, createContext } from 'react'
export const PortfiContext = createContext();

export const PortfiProvider = ({children}) => {
    const [dataFromBackend, setDataFromBackend] = useState([])
    const [dataFiltrada, setDataFiltrada] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loadingChart, setLoadingChart] = useState(false)

    const [loadingAnimation, setLoadingAnimation] = useState(false)
    const [listAssets, setListAssets] = useState([])
    const [compositionData, setCompositionData] = useState([])

    const [composition_portfoloio, setCompositionPortfolio] = useState([])
    const [performance, setPerformance] = useState({
        sharpe: {
            Portfolio:0,
            Benchmark:0
        },
        volatility:{
            Portafolio:0,
            Benchmark:0
        },
        drawdown:{
            Portafolio:0,
            Benchmark:0
        },
        downside_risk:{
            Portafolio:0,
            Benchmark:0
        },
        returns:{
            Portafolio:0,
            Benchmark:0
        },

        ret_portfolio : [],

        ret_benchmark : [],

        ret_dates : []

    })

    useEffect ( async () =>{
        if (loading) {
        const data = await fetch('/portfolio')
        const portfolio = await data.json()
        //DataForChart(portfolio)
        generateDataTable(portfolio)
        setCompositionData(portfolio)
        setListAssets(portfolio)
        setLoading(false)
    }
    }, [dataFiltrada, loading, compositionData])

    function generateDataTable(data) {
        const list_assets = []
        let ticker = ""
        let weigth = 0
        let name = ""
        let asset = {}
        for (let i = 0; i < data.length; i++){
            ticker = data[i].ticker;
            weigth = data[i].weigth;
            name = data[i].name;
            asset = {ticker, name, weigth}
            list_assets.push(asset)
        }
        setDataFromBackend(list_assets || [])
    }


    return (
        <PortfiContext.Provider value={{dataFromBackend, setDataFromBackend, dataFiltrada, setDataFiltrada, setLoading, setLoadingChart, listAssets, setListAssets, compositionData, setCompositionData, loading, setLoadingAnimation, loadingAnimation, composition_portfoloio, setCompositionPortfolio, performance, setPerformance  }}>
            {children}
        </PortfiContext.Provider>
        )
}