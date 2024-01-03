const searchInput = document.querySelector(".search-input");
const countInput = document.querySelector(".input-number");

const apiUrl = "http://localhost:4500/api/v1";

window.addEventListener("load", () => {
  searchInput.focus();
});

searchInput.addEventListener("keypress", function searchInputChange(event) {
  if (event.key == "Enter") {
    document.location.href = `/panel/buy/?search=${searchInput.value}`;
  }
});

async function btnSave(event, productID, operation) {
  const count = event.target.parentElement.parentElement.querySelector("input").value;
  apiBuyProduct(productID, count, operation);
}

function inputSave(event, productID, operation) {
  if (event.key == "Enter") {
    const count = event.target.parentElement.parentElement.querySelector("input").value;
    apiBuyProduct(productID, count, operation);
  }
}

async function apiBuyProduct(productID, count, operation) {
  const response = await fetch(`${apiUrl}/buy-sell/product/${productID}/${operation}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count }),
  });

  if (response.status == "200") {
    document.location.href = `/panel/buy/`;
  }
}
