import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants.js'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { pad } from '@tensorflow/tfjs';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    Title,
    Tooltip,
    Legend
);


const Graph = () => {
    const location = useLocation();
    const roll_number = location.state.roll_number
    const [result, setResult] = React.useState()

    useEffect(() => {
        const requestData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/student`, {
                    params: {
                        number: roll_number
                    }
                })
                if (response.status === 200) {
                    setResult(response.data)
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        requestData()
    }, [])

    const options = {
        plugins: {
            ChartDataLabels: {
                display: true,
            },
            title: {
                display: true,
                text: 'Performance Analysis of ' + roll_number,
                font: {
                    size: 30,
                    weight: 'bold'
                }
            },
            legend: {
                position: 'right',
            },
        },
        elements: {
            bar: {
                borderWidth: 0.5,
            },
            column: {
                borderRadius: 10,
                width: 10,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                width: 10
            },
        },
    };


    const data = {
        datasets: [
            {
                label: 'correct questions',
                data: result ? result.correct : [],
                backgroundColor: [
                    'rgba(0, 128, 0, 0.2)', // Green color for correct questions
                    'rgba(0, 128, 0, 0.2)',
                    'rgba(0, 128, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'wrong questions',
                data: result ? result.incorrect : [],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)', // Red color for wrong questions
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 0, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
        labels: result ? result.labels : []
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px', flexDirection: 'column', height: '100vh' }}>
            <div style={{ width: "800px" }}>
                <br />
                <br />
                <Bar options={options}
                    data={data} />
            </div>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'left', flexDirection: 'column' }}>

                <br />
                <br />
                <table>
                    <tr>
                        <th>Label</th>
                        <th>Correct</th>
                        <th>Incorrect</th>
                        <th>Accuracy</th>
                    </tr>
                    {result && result.labels.map((label, index) => {
                        return (
                            <tr key={index}>
                                <td>{label}</td>
                                <td>{result.correct[label]}</td>
                                <td>{result.incorrect[label]}</td>
                                <td>{((result.correct[label] / (result.correct[label] + result.incorrect[label])) * 100).toFixed(2)}%</td>
                            </tr>
                        )
                    })}
                </table>
                
            </div>
        </div>
    )
}

export default Graph