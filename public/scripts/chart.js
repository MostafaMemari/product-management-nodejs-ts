const initChart = (labels, data, initElement) => {
  const confing = {
    type: "line",
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "# of Votes",
          data: [...data],
          backgroundColor: "#04aa6d84",
          borderWidth: 2,
          tension: 0.45,
          fill: true,
          borderColor: "#006f46",
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  };
  return new Chart(initElement, confing);
};
