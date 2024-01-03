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
  } else {
    showAlert("danger", "ثبت اطلاعات با خطا مواجه شد");
  }
}

function showAlert(alertClass, message) {
  alertBox.style.display = "block";
  alertBox.style.opacity = 100;
  alertBox.setAttribute("class", `alert ${alertClass}`);
  alertBox.innerHTML = message;

  setTimeout(function () {
    alertBox.style.opacity = 0;
    alertBox.classList.remove(alertClass);
  }, 2500);
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 3000);
}

function resetInput() {
  const input = document.getElementsByTagName("input");
  for (var i = 0; i < input.length; i++) {
    if (input[i].type == "text") {
      input[i].value = "";
    }
  }
  // const selectBox = document.getElementsByTagName("select");
  // for (var i = 0; i < selectBox.length; i++) {
  //   selectBox[i].value = "none";
  // }
  // colorSelectBox.value = "none";
  // categorieSelectBox.value = "none";
  // sellerSelectBox.value = "none";
  // minInputSearch.value = "";
}
