const searchInput = document.querySelector(".search-input");
const countInput = document.querySelector(".input-number");
const alertBox = document.querySelector(".alert");
const messageSuccess = document.querySelector(".message-success").innerHTML;
const messageError = document.querySelector(".message-error").innerHTML;

const apiUrl = "http://localhost:4500/api/v1";

window.addEventListener("load", () => {
  resetInput();
  searchInput.focus();

  if (messageSuccess || messageError) {
    Toast.fire({
      icon: messageSuccess ? "success" : "error",
      title: messageSuccess ? messageSuccess : messageError,
    });
  }
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

async function btnRobot(productEncode) {
  const product = JSON.parse(decodeURIComponent(productEncode));

  const { _id, title, dkp, dkpc, price, img, url, width, height, count } = product;
  await Swal.fire({
    title: "ویرایش محصول",
    width: "1200px",
    html: `
      <div class="modal-content">
          <form action="/api/v1/products/${_id}"  method="post" class="modal-insert-product" id="form" novalidate="novalidate">
            <div class="row">
              <div class="col-100">
                <label for="title-pro">نام محصول</label>
              </div>
              <div class="col-100">
                <input type="text" id="title-pro" name="title" value="${title}" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="dkp-pro">کد محصول</label>
              </div>
              <div class="col-100">
                <input type="text" id="dkp-pro" name="dkp" oninput="getApiDigiKala(event)" value="${dkp}" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="dkpc-pro">کد تنوع</label>
              </div>
              <div class="col-100"><input type="text" id="dkpc-pro" name="dkpc" value="${dkpc}" /></div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="width-pro">طول</label>
              </div>
              <div class="col-100">
                <input type="text" id="width-pro" name="width" value="${width}" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="height-pro">عرض</label>
              </div>
              <div class="col-100">
                <input type="text" id="height-pro" name="height" value="${height}"/>
              </div>
            </div>
            <div class="row">
              <div class="col-100">
                <label for="count-pro">موجودی</label>
              </div>
              <div class="col-100">
                <input type="text" id="count-pro" name="count" value="${count}" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="color-pro">رنگ</label>
              </div>
              <div class="col-100">
                <select id="color-pro" name="color">
                  <option value="none" selected disabled hidden>انتخاب کنید</option>
                  <%colors.forEach(color => {%>
                  <option value="<%=color._id%>"><%=color.color%></option>
                  <%})%>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-100">
                <label for="categorie-pro">دسته بندی</label>
              </div>
              <div class="col-100">
                <select id="categorie-pro" name="categorie">
                  <option value="none" selected disabled hidden>انتخاب کنید</option>
                  <%categories.forEach(categorie => {%>
                  <option value="<%=categorie._id%>"><%=categorie.categories%></option>
                  <%})%>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="img-pro">تصویر</label>
              </div>
              <div class="col-100">
                <input type="text" id="img-pro" name="img" value="${img}" />
                <div>
                <img src="${img}" class="img-src" alt="" width="60" height="60" />
              </div>
              </div>

            </div>
          </form>
      </div>
    `,

    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      document.querySelector("form").submit();
    },
  });
}
