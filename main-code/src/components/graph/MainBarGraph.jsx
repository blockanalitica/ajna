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
        labels: ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: "Netto",
                borderRadius: 20,
                fill: false,
                backgroundColor: "#edf2f7",
                borderColor: "#edf2f7",
                data: [40, 68, 86, 74, 56, 60, 87, 56, 60, 87],
            },
        ],
    };

    const options = {
      plugins: {
        legend: {
            position: "top",
            align: "start",
            labels: {
                boxWidth: 10,
                usePointStyle: true,
                pointStlye: "circle",
            },
            title: {
                text: "Netto vs Brutto",
                display: true,
                color: "#000",
                font: {
                    size: 16,
                },
            },
        },
        elements: {
            bar: {
                barPercentage: 0.5,
                categoryPercentage: 1,
            },
            point: {
                radius: 0,
                hitRadius: 10,
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
        <Bar data={data} height={300} options={options} />
        </>
    )

}

export default MainBarGraph