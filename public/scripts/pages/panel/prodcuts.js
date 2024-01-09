const selectBoxColorElem = document.querySelector("#color-select-box");
const selectBoxCategoryElem = document.querySelector("#categorie-select-box");
const selectBoxSellerElem = document.querySelector("#seller-select-box");
const searchInputElem = document.querySelector(".search-input-elem");

window.addEventListener("load", () => {
  const searchParams = new URLSearchParams(window.location.search);

  const colorQuery = searchParams.get("color") ? searchParams.get("color").trim() : false;
  const categoryQuery = searchParams.get("category") ? searchParams.get("category").trim() : false;
  const sellerQuery = searchParams.get("seller") ? searchParams.get("seller").trim() : false;
  const searchQuery = searchParams.get("search") ? searchParams.get("search").trim() : false;

  console.log(searchQuery);

  if (colorQuery) {
    const optionsColor = Array.from(selectBoxColorElem.options);
    optionsColor.find((item) => item.text === colorQuery).selected = true;
  }
  if (categoryQuery) {
    const optionsCategory = Array.from(selectBoxCategoryElem.options);
    optionsCategory.find((item) => item.text === categoryQuery).selected = true;
  }
  if (sellerQuery) {
    const optionsSeller = Array.from(selectBoxSellerElem.options);
    optionsSeller.find((item) => item.text === sellerQuery).selected = true;
  }
  if (searchQuery) {
    searchInputElem.value = searchQuery;
  }
});

searchInputElem.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const color = selectBoxColorElem.options[selectBoxColorElem.selectedIndex].text;
    const category = selectBoxCategoryElem.options[selectBoxCategoryElem.selectedIndex].text;
    const seller = selectBoxSellerElem.options[selectBoxSellerElem.selectedIndex].text;
    const search = searchInputElem.value;

    const url = `${color === "انتخاب رنگ" ? "" : `&color=${color}`}${category === "انتخاب دسته بندی" ? "" : `&category=${category}`}${
      seller === "انتخاب فروشنده" ? "" : `&seller=${seller}`
    }`;
    window.location = `/panel/products/?search=${search ? search : ""}${url.replace(" &", "")} `;
  }
});

async function selectBoxColor(event) {
  const color = selectBoxColorElem.options[selectBoxColorElem.selectedIndex].text;
  const category = selectBoxCategoryElem.options[selectBoxCategoryElem.selectedIndex].text;
  const seller = selectBoxSellerElem.options[selectBoxSellerElem.selectedIndex].text;
  const search = searchInputElem.value;

  const url = `${color === "انتخاب رنگ" ? "" : `&color=${color}`}${category === "انتخاب دسته بندی" ? "" : `&category=${category}`}${
    seller === "انتخاب فروشنده" ? "" : `&seller=${seller}`
  }`;

  window.location = `/panel/products/?search=${search ? search : ""}${url.replace(" &", "")} `;
}
async function selectBoxCategory(event) {
  const color = selectBoxColorElem.options[selectBoxColorElem.selectedIndex].text;
  const category = selectBoxCategoryElem.options[selectBoxCategoryElem.selectedIndex].text;
  const seller = selectBoxSellerElem.options[selectBoxSellerElem.selectedIndex].text;
  const search = searchInputElem.value;

  const url = `${color === "انتخاب رنگ" ? "" : `&color=${color}`}${category === "انتخاب دسته بندی" ? "" : `&category=${category}`}${
    seller === "انتخاب فروشنده" ? "" : `&seller=${seller}`
  }`;

  window.location = `/panel/products/?search=${search ? search : ""}${url.replace(" &", "")} `;
}
async function selectBoxSeller(event) {
  const color = selectBoxColorElem.options[selectBoxColorElem.selectedIndex].text;
  const category = selectBoxCategoryElem.options[selectBoxCategoryElem.selectedIndex].text;
  const seller = selectBoxSellerElem.options[selectBoxSellerElem.selectedIndex].text;
  const search = searchInputElem.value;

  const url = `${color === "انتخاب رنگ" ? "" : `&color=${color}`}${category === "انتخاب دسته بندی" ? "" : `&category=${category}`}${
    seller === "انتخاب فروشنده" ? "" : `&seller=${seller}`
  }`;

  window.location = `/panel/products/?search=${search ? search : ""}${url.replace(" &", "")} `;
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
                  <option value="none" selected disabled hidden>انتخاب رنگ</option>
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
                  <option value="none" selected disabled hidden>انتخاب دسته بندی</option>
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

async function btnShowSeller(sellersEncode) {
  const sellers = JSON.parse(decodeURIComponent(sellersEncode));

  const listSeller = Object.entries(sellers).map(
    (key) => `        

          <tr>
            <td>${key[1].sellerTitle}</td>
            <td>
            <button onclick="btnShowModalUpdateSeller(event, '${encodeURIComponent(
              JSON.stringify(key[1])
            )}')" class="btn success" >ویرایش</button>
            <button disabled class="btn primary" onclick="btnShowModalDeleteSeller('${key[1]._id}')">حذف</button>
            </td>
          </tr>
    `
  );

  await Swal.fire({
    title: "فروشنده ها",
    width: "500px",
    html: `

      <form method="post" action="${apiUrl}/seller">
        <div class="table-seller">
            <input placeholder="نام فروشنده" type="text" name="sellerTitle"/>
            <input placeholder="کد فروشنده" type="text" name="sellerID"/>
            <input placeholder="توکن" type="text" name="token"/>

            <div class="seller-robot">
              <div>ربات</div>
              <label class="switch">
                <input type="checkbox" name="isRobot" checked/>
                <span class="slider round"></span>
              </label>
            </div> 
            <button class="btn success">ثبت فروشنده</button>

        </div>
      </form>

        <table class="table-show-list-seller">
          <thead>
            <tr>
              <th>نام فروشنده</th>
              <th></th>
            </tr>
          </thead>
        <tbody>${listSeller.join("")}</tbody>
        
      </table>
    `,

    showConfirmButton: false,
  });
}
async function btnShowModalUpdateSeller(event, sellersEncode) {
  const seller = JSON.parse(decodeURIComponent(sellersEncode));
  await Swal.fire({
    title: "فروشنده ها",
    width: "500px",
    html: `

        <div class="table-seller">
          <input placeholder="نام فروشنده" type="text" name="sellerTitle" value="${seller.sellerTitle}"/>
          <input placeholder="کد فروشنده" type="text" name="sellerID" value="${seller.sellerID}"/>
          <input placeholder="توکن" type="text" name="token" value="${seller.token}"/>

          <div class="seller-robot">
            <div>ربات</div>
            <label class="switch">
              <input id="switch-is-robot" type="checkbox" ${seller.isRobot ? "checked" : ""}/>
              <span class="slider round"></span>
            </label>
          </div> 
          <button onclick="btnUpdateSeller(event,'${seller._id}')" class="btn success">بروزرسانی فروشنده</button>
        </div>
    `,

    showConfirmButton: false,
  });
}
async function btnUpdateSeller(event, sellerId) {
  const updateElem = event.target.parentElement.parentElement;
  const sellerTitle = updateElem.querySelector('input[name="sellerTitle"]').value;
  const sellerID = +updateElem.querySelector('input[name="sellerID"]').value;
  const token = updateElem.querySelector('input[name="token"]').value;
  const isRobot = updateElem.querySelector("#switch-is-robot").checked;

  await fetch(`${apiUrl}/seller/${sellerId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sellerTitle, sellerID, token, isRobot }),
  }).then((res) => {
    if (res.status) {
      document.location.href = `/panel/products`;
    }
  });
}
async function btnShowModalDeleteSeller(sellerID) {
  swalWithBootstrapButtons
    .fire({
      title: "از حذف فروشنده اطمینان دارید؟",
      // text: "هیچ راه برگشتی نیستا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiUrl}/seller/${sellerID}`, { method: "DELETE" }).then((res) => {
          if (res.status) {
            swalWithBootstrapButtons
              .fire({
                title: "فروشنده با موفقیت حذف شد",
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
        <button disabled class="btn primary" onclick="btnDeleteCategory('${key[1]._id}')">حذف</button>
      </div>
    `
  );

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

async function btnShowColor(colorsEncode) {
  const colors = JSON.parse(decodeURIComponent(colorsEncode));

  const trColor = Object.entries(colors).map(
    (key) => `        
      <div class="table-color">
        <input type="text" name="${key[1]._id}" value="${key[1].name}" />
        <button onclick="btnUpdateColor(event, '${key[1]._id}')" class="btn success" >
          ویرایش
        </button>
        <button disabled class="btn primary" onclick="btnDeleteColor('${key[1]._id}')">حذف</button>
      </div>
    `
  );

  await Swal.fire({
    title: "رنگ ها",
    width: "500px",
    html: `
    <form method="post" action="${apiUrl}/colors">
     <div class="table-color">
      <button class="btn success" )">ثبت رنگ</button>
      <input type="text" name="name"/>
     </div>
    </form>
    ${trColor.join("")}`,

    showConfirmButton: false,
  });
}
async function btnDeleteColor(colorID) {
  swalWithBootstrapButtons
    .fire({
      title: "از حذف رنگ اطمینان دارید؟",
      // text: "هیچ راه برگشتی نیستا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`${apiUrl}/colors/${colorID}`, { method: "DELETE" }).then((res) => {
          if (res.status) {
            swalWithBootstrapButtons
              .fire({
                title: "رنگ با موفقیت حذف شد",
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
async function btnUpdateColor(event, colorID) {
  const updateValue = event.target.parentElement.querySelector("input").value;

  await fetch(`${apiUrl}/colors/${colorID}/`, {
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
