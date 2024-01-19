window.addEventListener("load", () => {
  document.querySelector("#input-search").focus();
});

function inputBuyAndSell(event, productID, operationPath) {
  if (event.key == "Enter") {
    const count = event.target.parentElement.parentElement.querySelector("input").value;

    const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
    const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

    apiBuyProduct(productID, count, operationPath, operation);
  }
}
function btnBuyAndSell(event, productID, operationPath) {
  const count = event.target.parentElement.parentElement.querySelector("input").value;

  const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
  const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

  apiBuyProduct(productID, count, operationPath, operation);
}

async function btnShowReportBuyAndSell(productID, operation) {
  const res = await fetch(`${apiUrl}/buy-sell/product/${productID}/report/${operation}`);
  const result = await res.json();
  const label = result.data.map((elem) => elem.date);
  const data = result.data.map((elem) => elem.count);

  let cardDate = null;
  cardDate = Object.entries(result.data).map(
    (key) => `
          <div class="flex flex-col items-center justify-center p-4 zoom-in ${
            operation === "sell" && key[1].operation === "دپو"
              ? "bg-green-50"
              : operation === "sell" && key[1].operation === "خرابی"
              ? "bg-red-50"
              : operation === "sell" && key[1].operation === "فروش"
              ? "bg-slate-50"
              : "bg-slate-50"
          }  w-32 h-28">
          <div class="font-medium  text-base">${key[1].date}</div>
            <div class="font-medium  text-base">${key[1].hour}</div>
            <div class="text-gray-600">${key[1].count} عدد</div>
          </div>
      `
  );
  Swal.fire({
    title: operation === "buy" ? "گزارش خرید" : "گزارش فروش",
    width: "90%",
    html: `
    <div class="flex flex-col lg:flex-row ">
      <div class="flex justify-center items-center flex-wrap gap-3 w-full lg:w-1/2">
        ${cardDate.join("")}
      </div>
      <div class="w-full lg:w-1/2">
        <canvas id="line-chart-widget"></canvas>
      </div>
    </div>
    `,
    showCancelButton: false,
    showConfirmButton: false,
  });
  initChartLine(label.reverse(), data.reverse(), document.querySelector("#line-chart-widget").getContext("2d"));
}
async function apiBuyProduct(productID, count, operationPath, operation) {
  const response = await fetch(`${apiUrl}/buy-sell/product/${productID}/${operationPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count, operation, status: operationPath }),
  });

  params.delete("search");
  params.delete("page");

  const searchQuery = "";

  const pathQuery = params.size ? `?${params.toString()}${searchQuery ? `&${searchQuery}` : ""}` : `${searchQuery ? `?${searchQuery}` : ""}`;

  if (response.ok) {
    document.location.href = operationPath == "buy" ? `/panel/products-buy/${pathQuery}` : `/panel/products-sell/${pathQuery}`;
  } else {
    Toast.fire({
      icon: "error",
      title: `${operationPath == "buy" ? `خرید` : `فروش`} با خطا مواجه شد`,
    });
  }
}
