import React, { useState, useEffect } from 'react'
import { LineGraph } from "../../components/LineGraph";
import moment from "moment"

async function getGraphData(type, id, timeRange = 'hour', from, to) {

    const body = {
        from: moment(from).format('YYYY-MM-DD HH:mm:ss'),
        to: moment(to).format('YYYY-MM-DD HH:mm:ss'),
    };

    let requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    return fetch(`${process.env.REACT_APP_BASE_API_URL}/stats/${timeRange}/${type}/${id}`, requestOptions);
}

export const Graph = ({ type, id }) => {
    const [data, setData] = useState({});
    const [timeRange, setTimeRange] = useState("hour");
    const [from, setFrom] = useState(moment().subtract(1, "days").toDate())
    const [to, setTo] = useState(moment().toDate())
    
    useEffect(() => {
        async function fetchData() {
            const { data } = await getGraphData(type, id, timeRange, from, to).then((res) => res.json());
            setData(data);
        }
        if (id) {
            fetchData();
        }
    }, [timeRange, from, to, id]);

    return (<LineGraph data={data} onChange={setTimeRange} timeRange={timeRange} from={from} to={to} onFromChange={setFrom} onToChange={setTo} />)
}