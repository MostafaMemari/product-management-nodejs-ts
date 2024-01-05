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
    const pathName = window.location.pathname.split("/")[2];
    document.location.href = `/panel/${pathName}/?search=${searchInput.value}`;
  }
});

async function btnSave(event, productID, operationPath) {
  const count = event.target.parentElement.parentElement.querySelector("input").value;

  const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
  const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

  console.log(productID, count, operationPath, operation);
  apiBuyProduct(productID, count, operationPath, operation);
}

function inputSave(event, productID, operationPath) {
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

async function btnRobot(productID) {
  const response = await fetch(`${apiUrl}/products/${productID}`);
  const product = await response.json();
  const { title, dkp } = product.data.product;
  console.log(product.data.product);
  const { value: formValues } = await Swal.fire({
    title: "Multiple inputs",
    html: `
    <input placeholder="نام محصول" id="input-input" class="swal2-input" value="${title}">
      <input placeholder="DKP" id="dkp-input" class="swal2-input" value="${dkp}">
      <input placeholder="طول" id="width-input" class="swal2-input">
      <input placeholder="عرض" id="height-input" class="swal2-input">
      <input placeholder="موجودی" id="count-input" class="swal2-input">
      <select id="" name="buy">
      <option value="خرید" selected>خرید</option>
      </select>
      <select id="" name="buy">
      <option value="خرید" selected>خرید</option>
      </select>
      <input type="file"> 
    `,

    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      return [document.getElementById("swal-input1").value, document.getElementById("swal-input2").value];
    },
  });
  if (formValues) {
    Swal.fire(JSON.stringify(formValues));
  }
}
