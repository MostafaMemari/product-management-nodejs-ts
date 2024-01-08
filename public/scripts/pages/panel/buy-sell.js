async function btnSaveBuyAndSell(event, productID, operationPath) {
  const count = event.target.parentElement.parentElement.querySelector("input").value;

  const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
  const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

  apiBuyProduct(productID, count, operationPath, operation);
}
function inputSaveBuyAndSell(event, productID, operationPath) {
  if (event.key == "Enter") {
    const count = event.target.parentElement.parentElement.querySelector("input").value;

    const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
    const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

    apiBuyProduct(productID, count, operationPath, operation);
  }
}
async function apiBuyProduct(productID, count, operationPath, operation) {
  const response = await fetch(`${apiUrl}/buy-sell/product/${productID}/${operationPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count, operation }),
  });

  if (response.status == "200") {
    document.location.href = operationPath == "buy" ? `/panel/buy/` : `/panel/sell/`;
  } else {
    Toast.fire({
      icon: "error",
      title: `${operationPath == "buy" ? `خرید` : `فروش`} با خطا مواجه شد`,
    });
  }
}

async function btnShowReportBuy(productID) {
  const res = await fetch(`${apiUrl}/buy-sell/product/${productID}/report/buy`);
  const resultBuy = await res.json();

  const label = resultBuy.data.map((elem) => elem.date);
  const data = resultBuy.data.map((elem) => elem.count);

  const cardDate = Object.entries(resultBuy.data)
    .map(
      (key) => `        
      <div class="card-date">
        <div class="date">${key[1].date}</div>
        <div class="count">${key[1].hour} | ${key[1].count} عدد</div>
      </div>
    `
    )
    .reverse();

  Swal.fire({
    title: "گزارش خرید",
    width: "90%",
    html: `
      <div class="modal-report">
        <div class="card-date-container">
          ${cardDate.join("")}
        </div>
        <div class="card-chart">
          <canvas id="myChart"></canvas>
        </div>
      </div>


    `,
    showCancelButton: false,
    showConfirmButton: false,
  });
  initChart(label, data, document.querySelector("#myChart").getContext("2d"));
}

async function btnShowReportSell(productID) {
  const res = await fetch(`${apiUrl}/buy-sell/product/${productID}/report/sell`);
  const resultBuy = await res.json();

  const label = resultBuy.data
    .map((elem) => {
      if (elem.operation !== "خرابی") {
        return elem.date;
      }
    })
    .filter((elem) => {
      return elem !== undefined;
    });

  const data = resultBuy.data
    .map((elem) => {
      if (elem.operation !== "خرابی") {
        return elem.count;
      }
    })
    .filter((elem) => {
      return elem !== undefined;
    });

  const cardDate = Object.entries(resultBuy.data)
    .map(
      (key) => `        
      <div class="card-date ${key[1].operation === "دپو" ? "bg-depo" : key[1].operation === "خرابی" ? "bg-broken" : ""}">
        <div class="date">${key[1].date}</div>
        <div class="count">${key[1].hour} | ${key[1].count} عدد</div>
      </div>
    `
    )
    .reverse();

  Swal.fire({
    title: "گزارش فروش",
    width: "90%",
    html: `
      <div class="modal-report">
        <div class="card-date-container">
          ${cardDate.join("")}
        </div>
        <div class="card-chart">
          <canvas id="myChart"></canvas>
        </div>
      </div>


    `,
    showCancelButton: false,
    showConfirmButton: false,
  });
  initChart(label, data, document.querySelector("#myChart").getContext("2d"));
}
