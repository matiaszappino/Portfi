import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { PortfiContext } from "./context/portfiContext";

export const LineGraph = () => {
  const { performance } = useContext(PortfiContext)

  const { ret_benchmark, ret_dates, ret_portfolio } = performance

  useEffect(() => {
    // console.log(performance.ret_dates)
  }, [performance]);


  const [estado, setEstado] = useState(
    {
      options: {
        stroke: {
          width: 1.5
        },
        chart: {
          id: "basic-bar",
          width: "100%"
        },
        xaxis: {
          labels: {
            rotate: 0, 
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
            }
            //categories: ['May 2020', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr 2021'],
          },
          categories: ret_dates
        }
      },
      series: [
        {
          name: "Portfolio (%)",
          data: ret_portfolio
          //data: ['57%', '75%', '87%', '80%', '98%', '115%', '110%', '130%', '140%', '127%', '120%', '133%']
        },
        {
          name: "Benchmark (%)",
          //data: ['73%', '87%', '90%', '110%', '105%', '127%', '105%', '110%', '119%', '123%', '129%', '139%']
          data: ret_benchmark
        }
      ]
    })

  const { options, series } = estado

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
