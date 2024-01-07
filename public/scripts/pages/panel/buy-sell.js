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
