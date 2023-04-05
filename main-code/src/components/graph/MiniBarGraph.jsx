import React, { useState } from "react";

import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
 } from 'chart.js';
import SwitchDisplays from '../switch/DisplaySwitch';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const MiniBarGraph = () => {
    const displayOptions = [
        { key: "deposit", value: "Deposit" },
        { key: "collateral", value: "Collateral" },
      ];
    
    const [curentlyDisplayed, setCurrentDisplay] = useState(displayOptions[0].key);

    const data = {
        labels: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        ],
        datasets: [
            {
                borderRadius: 2,
                borderColor: "#fff",
                fill: false,
                backgroundColor: "deposit" === curentlyDisplayed ? "#81c7db" : "#fff",
                data: [ 40, 68, 8, 74, 56, 60, 7, 6, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, ],
            },
        ],
    };

    const options = {
        elements: {
            bar: {
                barPercentage: 0.5,
                categoryPercentage: 1,
            },
        },
        scales: {
            xAxis: { display: false /* this is redundent */ },
            yAxis: { display: false /* this is redundent */ },  
        },
      plugins: {
        legend: {
            display: false
        },

      },
    };

    return (
        <>
        <div className="flex flex-col justify-between bg-gray-23 p-6 rounded-3xl">
            <div className="flex justify-end  py-2 px-3">
                <SwitchDisplays displayOptions={displayOptions} active={curentlyDisplayed} setActive={setCurrentDisplay} />
            </div>
            <div className="px-5 py-3">
                <Bar data={data} height={200} options={options} />
            </div>
        </div>
        </>
    )

}

export default MiniBarGraph;