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
async function btnUpdateProduct(productEncode, categoriesEncode, colorsEncode) {
  const product = JSON.parse(decodeURIComponent(productEncode));
  const { _id, title, dkp, dkpc, width, height, count, color, category } = product;

  const categories = JSON.parse(decodeURIComponent(categoriesEncode));
  const optionCategory = Object.entries(categories).map((key) =>
    category._id === key[1]._id
      ? `<option selected value='${key[1]._id}'>${key[1].name}</option>`
      : `<option value='${key[1]._id}'>${key[1].name}</option>`
  );
  const colors = JSON.parse(decodeURIComponent(colorsEncode));
  const optionColors = Object.entries(colors).map((key) =>
    color._id === key[1]._id
      ? `<option selected value='${key[1]._id}'>${key[1].name}</option>`
      : `<option value='${key[1]._id}'>${key[1].name}</option>`
  );

  await Swal.fire({
    title: "ویرایش محصول",
    width: "1000px",
    html: `
      <div class="modal-content">
          <form action="/api/v1/products/${_id}"  method="post" class="modal-insert-product" id="form" novalidate="novalidate" enctype="multipart/form-data">
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
                  ${optionColors.join("")}
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-100">
                <label for="categorie-pro">دسته بندی</label>
              </div>
              <div class="col-100">
                <select id="categorie-pro" name="category">
                  ${optionCategory.join("")}
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="img-pro">تصویر</label>
              </div>
              <div class="col-100" >
                <input type="file" name="img"  />
              </div>
            </div>

            </div>
          </form>
      </div>
    `,

    showCancelButton: true,
    confirmButtonText: "ویرایش محصول",
    cancelButtonText: "انصراف",
    focusConfirm: false,
    preConfirm: () => {
      document.querySelector("form").submit();
    },
  });
}
async function btnCreateProduct(categoriesEncode, colorsEncode) {
  const categories = JSON.parse(decodeURIComponent(categoriesEncode));
  const optionCategory = Object.entries(categories).map((key) => `<option value='${key[1]._id}'>${key[1].name}</option>`);
  const colors = JSON.parse(decodeURIComponent(colorsEncode));
  const optionColors = Object.entries(colors).map((key) => `<option value='${key[1]._id}'>${key[1].name}</option>`);

  await Swal.fire({
    title: "ویرایش محصول",
    width: "1000px",
    html: `
      <div class="modal-content">
          <form action="/api/v1/products/"  method="post" class="modal-insert-product" id="form" novalidate="novalidate" enctype="multipart/form-data">
            <div class="row">
              <div class="col-100">
                <label for="title-pro">نام محصول</label>
              </div>
              <div class="col-100">
                <input type="text" id="title-pro" name="title" value="" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="dkp-pro">کد محصول</label>
              </div>
              <div class="col-100">
                <input type="text" id="dkp-pro" name="dkp" oninput="getApiDigiKala(event)" value="" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="dkpc-pro">کد تنوع</label>
              </div>
              <div class="col-100"><input type="text" id="dkpc-pro" name="dkpc" value="" /></div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="width-pro">طول</label>
              </div>
              <div class="col-100">
                <input type="text" id="width-pro" name="width" value="" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="height-pro">عرض</label>
              </div>
              <div class="col-100">
                <input type="text" id="height-pro" name="height" value=""/>
              </div>
            </div>
            <div class="row">
              <div class="col-100">
                <label for="count-pro">موجودی</label>
              </div>
              <div class="col-100">
                <input type="text" id="count-pro" name="count" value="" />
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="color-pro">رنگ</label>
              </div>
              <div class="col-100">
                <select id="color-pro" name="color">
                  <option value="none" selected>انتخاب رنگ</option>
                  ${optionColors.join("")}
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-100">
                <label for="categorie-pro">دسته بندی</label>
              </div>
              <div class="col-100">
                <select id="categorie-pro" name="category">
                  <option value="none" selected>انتخاب دسته بندی</option>
                  ${optionCategory.join("")}
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-100">
                <label for="img-pro">تصویر</label>
              </div>
              <div class="col-100" >
                <input type="file" name="img"  />
              </div>
            </div>

            </div>
          </form>
      </div>
    `,

    showCancelButton: true,
    confirmButtonText: "ثبت محصول",
    cancelButtonText: "انصراف",
    focusConfirm: false,
    preConfirm: () => {
      document.querySelector("form").submit();
    },
  });
}
async function btnDeleteProduct(productID) {
  swalWithBootstrapButtons
    .fire({
      title: "از حذف محصول اطمینان دارید؟",
      // text: "هیچ راه برگشتی نیستا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiUrl}/products/${productID}`, { method: "DELETE" }).then((res) => {
          if (res.status) {
            swalWithBootstrapButtons
              .fire({
                title: "محصول با موفقیت حذف شد",
                // text: "Your file has been deleted.",
                icon: "success",
              })
              .then((res) => {
                document.location.href = `/panel/products`;
              });
          }
        });
      }
    });
}
async function btnShowCategory(categoriesEncode) {
  const categories = JSON.parse(decodeURIComponent(categoriesEncode));

  const trCategory = Object.entries(categories).map(
    (key) => `        
      <div class="table-category">
        <input type="text" name="${key[1]._id}" value="${key[1].name}" />
        <button onclick="btnUpdateCategory(event, '${key[1]._id}')" class="btn success" >
          ویرایش
        </button>
        <button class="btn primary" onclick="btnDeleteCategory('${key[1]._id}')">حذف</button>
      </div>
    `
  );

  console.log();
  await Swal.fire({
    title: "دسته بندی",
    width: "500px",
    html: `
    <form method="post" action="${apiUrl}/category">
     <div class="table-category">
      <button class="btn success" )">ثبت دسته بندی</button>
      <input type="text" name="name"/>
     </div>
    </form>
    ${trCategory.join("")}`,

    showConfirmButton: false,
  });
}
async function btnDeleteCategory(categoryID) {
  swalWithBootstrapButtons
    .fire({
      title: "از حذف دسته بندی اطمینان دارید؟",
      // text: "هیچ راه برگشتی نیستا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiUrl}/category/${categoryID}`, { method: "DELETE" }).then((res) => {
          if (res.status) {
            swalWithBootstrapButtons
              .fire({
                title: "دسته بندی با موفقیت حذف شد",
                // text: "Your file has been deleted.",
                icon: "success",
              })
              .then((res) => {
                document.location.href = `/panel/products`;
              });
          }
        });
      }
    });
}
async function btnUpdateCategory(event, categoryID) {
  const updateValue = event.target.parentElement.querySelector("input").value;

  await fetch(`${apiUrl}/category/${categoryID}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: updateValue }),
  }).then((res) => {
    if (res.status) {
      document.location.href = `/panel/products`;
    }
  });
}
