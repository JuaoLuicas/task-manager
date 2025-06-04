import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

function Charts(props) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    }

    const chart = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(chart, {
      type: "pie",
      data: {
        labels: props.chartLabels,
        datasets: [
          {
            label: "Tarefas",
            data: props.chartData,
            backgroundColor: ["#22c55e", "#facc15", "#dc2626"],
          },
        ],
      },
      options: {
        responsive: true, // Torna o gráfico responsivo
        maintainAspectRatio: false, // Permite que o canvas redimensione livremente
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Conclusão de Tarefas",
            font: {
              size: 20,
            },
          },
        },
      },
    });
  }, []);

    return <canvas ref={chartRef} className="p-5 rounded-lg bg-white-tone-1 shadow-lg"></canvas>

}

export default Charts;
