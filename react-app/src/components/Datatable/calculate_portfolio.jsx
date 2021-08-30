import { useContext, useState } from "react";
import axios from 'axios';
import { PortfiContext } from "../context/portfiContext";

export default function CalculatePortfi() {

    const { setLoadingAnimation, setPerformance, performance } = useContext(PortfiContext)

    // const [gral_data, setData] = useState({
    //     gral_data: undefined,
    //     error2: undefined
    // });

    // const executePortfolio = async ({ data }) => {
    //     setLoadingAnimation(true)
    //     await axios.post('/calculatePortfi', data).then(response => {
    //         setData({gral_data : response.data})
    //         console.log("setado",gral_data)
    //         setLoadingAnimation(false)
    //     }).catch(error => {
    //         setData({ error2: error.message,
    //         gral_data: undefined})
    //         setLoadingAnimation(false)
    //     })    
    // };

    const executePortfolio = async ({ data }) => {
        setLoadingAnimation(true)
        await axios.post('/calculatePortfi', data).then(response => {
            setPerformance(response.data);
            setLoadingAnimation(false);
    })
};

return { executePortfolio };
};
