async function btnSaveRobot(event, productID) {
  const documentRobot = event.target.parentElement.parentElement.parentElement;
  const inputReducePrice = documentRobot.querySelector("#input-reduce-price").value;
  const inputMinPrice = documentRobot.querySelector("#input-min-price").value;
  const inputMaxPrice = documentRobot.querySelector("#input-max-price").value;
  const isActiveSwitch = documentRobot.querySelector("#switch-is-active").checked;
  const isBuyboxSwitch = documentRobot.querySelector("#switch-is-buybox").checked;
  const isCheckPriceSwitch = documentRobot.querySelector("#switch-is-checkprice").checked;

  fetch(`${apiUrl}/products/${productID}/robot`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reducePrice: +inputReducePrice,
      maxPrice: +inputMaxPrice,
      minPrice: +inputMinPrice,
      isActive: isActiveSwitch,
      isBuyBox: isBuyboxSwitch,
      isCheckPrice: isCheckPriceSwitch,
    }),
  }).then((res) => {
    if (res.status) {
      document.location.href = `/panel/robot-control`;
    }
  });
}
