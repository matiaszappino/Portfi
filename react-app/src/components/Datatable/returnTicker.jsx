import React, { useState } from "react";
import UsePost from './addPost'
import { useContext } from "react";
import { PortfiContext } from "../context/portfiContext";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CalculatePortfi from './calculate_portfolio'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10ch',
    },
    button: {
      width: '25%',
    },
  },
}));


export default function InputTicker() {
  const { setLoading, setDataFiltrada, dataFiltrada, dataFromBackend, loading, setPerformance } = useContext(PortfiContext)
  const [ticker, setTicker] = useState("");
  const [weight, setWeight] = useState(0);
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const { data, error, executePost } = UsePost();
  const { executePortfolio } = CalculatePortfi();

  const handleSubmit = event => {
    event.preventDefault();
    if (!(startDate === "" || endDate === "")) {
      //console.log("DataFiltrada antes de irse", dataFiltrada)
      executePortfolio({ data: { dataFiltrada, startDate, endDate } })
    }
    setLoading(true)
  }

  const handleOnClickAdd = event => {
    event.preventDefault();
    let flag = false
    if (!(ticker === "")) {
      dataFiltrada.map((asset) => {
        console.log(asset)
        if (asset.ticker === ticker) {
          flag = true
        }
      })
    }
    if (flag === false) {
      console.log(ticker)
      executePost({ data: { ticker, weight } })
      setLoading(true)
    }
  }


  return (
    <div style={{ marginBottom: "10px" }}>
      <form onSubmit={handleSubmit}>
        <TextField size="small" style={{ marginLeft: '10px', maxWidth: '70px', marginRight: '20px' }} id="standard-basic" label="Ticker" type="text" value={ticker} name='ticker' onChange={event => setTicker(event.target.value)} />
        <TextField size="small" style={{ maxWidth: '70px', marginRight: '10px' }} id="standard-basic" label="Weight" type="number" value={weight} name='weight' onChange={event => setWeight(event.target.value)} />
        <Button size="small" style={{ maxWidth: '10px', maxHeight: '30px', marginRight: '10px', marginTop: '15px', fontSize: '20px' }} variant="contained" type="button" onClick={handleOnClickAdd} value="Add" color="primary">+</Button>
        <TextField size="small" style={{ maxWidth: '150px', marginRight: '20px', marginTop: '15px' }} id="standard-basic" type="date" value={startDate} name="startDate" onChange={event => setStart(event.target.value)} />
        <TextField size="small" style={{ maxWidth: '150px', marginRight: '20px', marginTop: '15px' }} id="standard-basic" type="date" value={endDate} name="endDate" onChange={event => setEnd(event.target.value)} />
        <Button size="small" style={{ maxWidth: '10px', marginTop: '15px' }} variant="contained" type="submit" name="Send" color="primary">SEND</Button>
      </form>
    </div>
  )
};
