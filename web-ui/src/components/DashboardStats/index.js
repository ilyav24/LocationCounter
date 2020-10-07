import React, { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

async function getCount() {

    let requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    return fetch(`${process.env.REACT_APP_BASE_API_URL}/daily/sensor`, requestOptions);
}

export const DashboardStats = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const { data } = await getCount().then((res) => res.json());
            setData(data);
        }
        let interval;
        // run in loops
        fetchData();
        interval = setInterval(() => {
            fetchData();
        }, 5000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const total = data.reduce((s, x) => s + +x.count, 0)
    const outTotal = data[0] ? data[0].count : 0;
    const inTotal = data[1] ? data[1].count : 0;


    return (
        <>
            <Col xs="12" sm="6" md="4">
                <Card className="text-white bg-info text-center">
                    <CardBody>
                        Total daily events: {total}
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" sm="6" md="4">
                <Card className="text-white bg-success text-center">
                    <CardBody>
                        <div>
                            <FaArrowUp color="white" />
                        &nbsp;&nbsp;
                        Daily "in" events: {inTotal}
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" sm="6" md="4">
                <Card className="text-white bg-danger text-center">
                    <CardBody>
                        <div>
                            <FaArrowDown color="white" />
                &nbsp;&nbsp;
                Daily "out" events: {outTotal}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

