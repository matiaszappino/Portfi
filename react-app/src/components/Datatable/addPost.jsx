import { useState, useContext } from "react";
import axios from 'axios';
import { PortfiContext } from "../context/portfiContext";

export default function UsePost() {
    const { setIncomingTicker } = useContext(PortfiContext)
    const [data, setData] = useState({
        data: undefined,
        error: undefined
    });

    const executePost = ({ data }) => {
        axios.post('/returnTicker', data).then(response => {
            setData({data : response.data})
        }).catch(error => {
            setData({ error: error.message,
            data: undefined})
        })    
    };
    return {...data, executePost};
};
