import React from 'react'
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardHeader, FormGroup, Input, Label, Row } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { groupBy, uniq, xor } from 'lodash';


const TIME_RANGES = [{ name: "Every Minute", value: "minute" }, { name: "Every Hour", value: "hour" }, { name: "Every Day", value: "day" }];

export const LineGraph = ({ data, onChange, timeRange, from, to, onFromChange, onToChange }) => {
    const labels = uniq(Array.from(data, item => moment(item.date).format('lll')))
    const dataBySensor = groupBy(data, 'date')
    const lineData = []
    for (const date in dataBySensor) {
        let sum = dataBySensor[date].reduce((s, a) => s + a.num, 0)
        lineData.push(sum)
    }
    const options = {
        tooltips: {
            enabled: true,
        },
        maintainAspectRatio: true,
        legend: {
            display: false
        }
    };
    const line = {
        labels: labels,
        datasets: [
            {
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#4472C4",
                borderColor: "#4472C4",
                borderCapStyle: "round",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "#4472C4",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointRadius: 3,
                pointHoverBackgroundColor: "#4472C4",
                pointHoverBorderColor: "#4472C4",
                pointHoverBorderWidth: 2,
                pointHitRadius: 10,
                data: lineData,
                spanGaps: true,
            },
        ],
    };

    return (
        <div className="animated fadeIn fadeOut">
            <Card>
                <CardHeader>
                    Occupancy
                <div className="card-header-actions">
                        <Label>&nbsp;From:&nbsp;</Label>
                        <DateTimePicker disableClock value={from} onChange={onFromChange} clearIcon={null} />
                        <Label>&nbsp;To:&nbsp;</Label>
                        <DateTimePicker disableClock value={to} onChange={onToChange} clearIcon={null} />
                    </div>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label>Time Range</Label>
                        <Input type="select" value={timeRange} onChange={({ target: { value } }) => {
                            onChange(value);
                        }}>
                            {TIME_RANGES.map((item) => {
                                return <option value={item.value}>{item.name}</option>;
                            })}
                        </Input>
                    </FormGroup>
                    {data.length !== 0 ?
                        <Line data={line} options={options} />
                        : 'No data found about occupancy'
                    }
                </CardBody>
            </Card>
        </div >)
}