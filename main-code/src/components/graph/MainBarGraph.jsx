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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const MainBarGraph = () => {
    const data = {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
        datasets: [
            {
                label: "Netto",
                borderRadius: 20,
                fill: false,
                backgroundColor: "#edf2f7",
                borderColor: "#edf2f7",
                data: [40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                    40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                    40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                    40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                    40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                    40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                    40, 68, 86, 74, 56, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 60, 87, 56, 60, 87, 
                ],
            },
        ],
    };

    const options = {
      plugins: {
        elements: {
            bar: {
                barPercentage: 0.5,
                categoryPercentage: 1,
            },
        },
        scales: {
            xAxis: {
                display: false,
            },
            yAxis: {
                display: false,
            },
        },
      },
    };
    
          

    return (
        <>
        <div className="flex flex-col justify-between bg-black border border-gray-20 p-6 rounded-3xl">
        <Bar data={data} height={300} options={options} />
        </div>
        </>
    )

}

export default MainBarGraph;