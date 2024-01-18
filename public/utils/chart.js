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

const initChartLine = (labels, data, initElement) => {
  const confing = {
    type: "line",
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "",
          data: [...data],
          borderWidth: 2,
          borderColor: "#3160D8",
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
        },
      ],
    },
    options: {
      plugins: {
        legend: false,
      },
      scales: {
        xAxes: [
          {
            ticks: { fontSize: "12", fontFamily: "'IRANYekan-L', sans-serif", fontColor: "#777777" },
            gridLines: { display: !1 },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontSize: "12",
              fontFamily: "'IRANYekan-L', sans-serif",
              fontColor: "#777777",
              callback: function (e, t, n) {
                return Math.ceil(e) + " عدد ";
              },
            },
            gridLines: {
              color: "#D8D8D8",
              zeroLineColor: "#D8D8D8",
              borderDash: [2, 2],
              zeroLineBorderDash: [2, 2],
              drawBorder: !1,
            },
          },
        ],
      },
    },
  };
  return new Chart(initElement, confing);
};
