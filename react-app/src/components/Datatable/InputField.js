import React, { useContext, useState } from "react";
import { PortfiContext } from "../context/portfiContext";
import "../main/Main.css"
import Datatable from "./Datatable";
import ReturnTicker from "./returnTicker"

export default function InputField({ data }) {

    const { dataFromBackend } = useContext(PortfiContext)

    const [value, setValue] = useState({
        ticker : '',
        weight : 0,
        startDate : '',
        endDate : '',
    })
    const {
        endDate, startDate, ticker, weight
    } = value


    return (
        <div className="inputField">
        <div>
        <ReturnTicker/>
        </div>

        <div>
        <Datatable data={dataFromBackend}/>
        </div>
    </div>
    );

}