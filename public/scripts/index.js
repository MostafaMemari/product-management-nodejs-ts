const searchInput = document.querySelector(".search-input");
const countInput = document.querySelector(".input-number");
const alertBox = document.querySelector(".alert");

const apiUrl = "http://localhost:4500/api/v1";

window.addEventListener("load", () => {
  resetInput();
  searchInput.focus();
});

searchInput.addEventListener("keypress", function searchInputChange(event) {
  if (event.key == "Enter") {
    document.location.href = `/panel/buy/?search=${searchInput.value}`;
  }
});

async function btnSave(event, productID, operation) {
  const count = event.target.parentElement.parentElement.querySelector("input").value;

  const selectElemBuy = event.target.parentElement.parentElement.querySelector("select");
  const buyAndSell = selectElemBuy.options[selectElemBuy.selectedIndex].text;

  apiBuyProduct(productID, count, operation, buyAndSell);
}

function inputSave(event, productID, operation) {
  if (event.key == "Enter") {
    const count = event.target.parentElement.parentElement.querySelector("input").value;
    const selectElemBuy = event.target.parentElement.parentElement.querySelector("select");
    const buyAndSell = selectElemBuy.options[selectElemBuy.selectedIndex].text;
    apiBuyProduct(productID, count, operation, buyAndSell);
  }
}

async function apiBuyProduct(productID, count, operation, buyAndSell) {
  const response = await fetch(`${apiUrl}/buy-sell/product/${productID}/${operation}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count, operation: buyAndSell }),
  });

  if (response.status == "200") {
    document.location.href = `/panel/buy/`;
  } else {
    showAlert("danger", "ثبت اطلاعات با خطا مواجه شد");
  }
}
