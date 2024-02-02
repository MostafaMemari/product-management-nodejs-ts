async function btnRemoveProduct(prodcutID) {
  swalBtnDelete
    .fire({
      title: "آیا از حذف محصول اطمینان دارید؟",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${apiUrl}/products/${prodcutID}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok) {
          Swal.fire({
            title: "حذف شد",
            text: result.message,
            icon: "success",
            confirmButtonText: "باشه",
          }).then((res) => {
            window.location.href = "/panel/products";
          });
        }
      }
    });
}
async function btnNewProduct(categoriesEncode, colorsEncode, sellersEncode) {
  const categories = JSON.parse(decodeURIComponent(categoriesEncode));
  const optionCategory = Object.entries(categories).map((key) => `<option value='${key[1]?._id}'>${key[1]?.name}</option>`);

  const colors = JSON.parse(decodeURIComponent(colorsEncode));
  const optionColors = Object.entries(colors).map((key) => `<option class="p-20" value='${key[1]?._id}'>${key[1]?.name}</option>`);

  const sellers = JSON.parse(decodeURIComponent(sellersEncode));
  const optionSeller = Object.entries(sellers).map((key) => `<option value='${key[1]?._id}'>${key[1]?.sellerTitle}</option>`);

  Swal.fire({
    title: "ثبت محصول جدید",
    width: "1000px",
    html: `
  <form action="/api/v1/products/form" method="post" id="form" novalidate="novalidate" enctype="multipart/form-data">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5 p-5">
      <div>
        <label for="product-title" class="form-label">نام محصول</label>
        <input id="product-title" type="text" name="title" class="form-control w-full" />
      </div>
      <div>
        <label for="product-dkp" class="form-label">کد محصول</label>
        <input id="product-dkp" type="text" name="dkp" class="form-control w-full" />
      </div>
      <div>
        <label for="product-dkpc" class="form-label">کد تنوع</label>
        <input id="product-dkpc" type="text" name="dkpc" class="form-control w-full" />
      </div>
      <div>
        <label for="product-width" class="form-label">طول</label>
        <input id="product-width" type="text" name="width" class="form-control w-full" />
      </div>
      <div>
        <label for="product-height" class="form-label">عرض</label>
        <input id="product-height" type="text" name="height" class="form-control w-full" />
      </div>
      <div>
        <label for="product-count" class="form-label">موجودی</label>
        <input id="product-count" type="text" name="count" class="form-control w-full" />
      </div>
  
      <div>
        <label for="product-color" class="form-label">رنگ</label>
        <select name="color"
          id="product-color"
          class="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="none" selected disabled hidden>انتخاب رنگ</option>
          ${optionColors.join("")}
        </select>
      </div>
  
      <div>
        <label for="product-category" class="form-label">دسته بندی</label>
        <select name="category"
          id="product-category"
          class="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="none" selected disabled hidden>انتخاب دسته بندی</option>
          ${optionCategory.join("")}
        </select>
      </div>
  
      <div>
        <label for="product-seller" class="form-label">فروشنده</label>
        <select name="seller"
          id="product-seller"
          class="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="none" selected disabled hidden>انتخاب فروشنده</option>
          ${optionSeller.join("")}
        </select>
      </div>
  
      <div>
        <label for="crud-form-1" class="form-label">تصویر</label>
        <input type="file" name="img" id="prodcut-img"class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4" />
      </div>
    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "ثبت محصول",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    // preConfirm: async () => {
    //   const productTitleElem = document.querySelector("#product-title");
    //   const productDkpElem = document.querySelector("#product-dkp");
    //   const productDkpcElem = document.querySelector("#product-dkpc");
    //   const productWidthElem = document.querySelector("#product-width");
    //   const productHeightElem = document.querySelector("#product-height");
    //   const productCountElem = document.querySelector("#product-count");
    //   const productColorElem = document.querySelector("#product-color");
    //   const productCategoryElem = document.querySelector("#product-category");
    //   const productSellerElem = document.querySelector("#product-seller");
    //   const productImgElem = document.querySelector("#prodcut-img");

    //   const formData = new FormData();
    //   formData.append("title", productTitleElem.value.trim());
    //   formData.append("dkp", productDkpElem.value.trim());
    //   formData.append("dkpc", productDkpcElem.value.trim());
    //   formData.append("width", productWidthElem.value.trim());
    //   formData.append("height", productHeightElem.value.trim());
    //   formData.append("count", productCountElem.value.trim());
    //   formData.append("color", productColorElem.options[productColorElem.selectedIndex].value);
    //   formData.append("category", productCategoryElem.options[productCategoryElem.selectedIndex].value);
    //   formData.append("seller", productSellerElem.options[productSellerElem.selectedIndex].value);
    //   formData.append("img", productImgElem.files[0]);

    //   const res = await fetch(`${apiUrl}/products/`, { method: "POST", body: formData });

    //   const result = await res.json();
    //   if (res.ok) {
    //     Swal.fire({
    //       title: "ثبت شد",
    //       text: result.message,
    //       icon: "success",
    //       confirmButtonText: "باشه",
    //     }).then((res) => {
    //       window.location.href = "/panel/products";
    //     });
    //   } else {
    //     Swal.fire({
    //       title: "خطا",
    //       text: "ثبت محصول با خطا مواجه شد",
    //       icon: "error",
    //       confirmButtonText: "باشه",
    //     }).then((res) => {
    //       window.location.href = "/panel/products";
    //     });
    //   }
    // },

    // Way 2 => send data form (error handler flash) => OK
    preConfirm: async () => {
      document.querySelector("form").submit();
    },
  });
}
async function btnUpdateProduct(productEncode, categoriesEncode, colorsEncode, sellerEncode) {
  const product = JSON.parse(decodeURIComponent(productEncode));
  const { _id, title, dkp, dkpc, width, height, count, color, category, seller } = product;

  const categories = JSON.parse(decodeURIComponent(categoriesEncode));
  const optionCategory = Object.entries(categories).map((key) =>
    category?._id === key[1]?._id
      ? `<option selected value='${key[1]?._id}'>${key[1]?.name}</option>`
      : `<option value='${key[1]?._id}'>${key[1]?.name}</option>`
  );
  const colors = JSON.parse(decodeURIComponent(colorsEncode));
  const optionColors = Object.entries(colors).map((key) =>
    color?._id === key[1]?._id ? `<option selected value='${key[1]?._id}'>${key[1]?.name}</option>` : `<option value='${key[1]?._id}'>${key[1]?.name}</option>`
  );
  const sellers = JSON.parse(decodeURIComponent(sellerEncode));

  const optionSeller = Object.entries(sellers).map((key) =>
    seller?._id === key[1]?._id
      ? `<option selected value='${key[1]?._id}'>${key[1]?.sellerTitle}</option>`
      : `<option value='${key[1]?._id}'>${key[1]?.sellerTitle}</option>`
  );

  Swal.fire({
    title: "بروزرسانی محصول",
    width: "1000px",
    html: `
  <form action="/api/v1/products/${_id}/form" method="post" id="form" novalidate="novalidate" enctype="multipart/form-data">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5 p-5">
      <div>
        <label for="product-title" class="form-label">نام محصول</label>
        <input value="${title}" id="product-title" type="text" name="title" class="form-control w-full" />
      </div>
      <div>
        <label for="product-dkp" class="form-label">کد محصول</label>
        <input value="${dkp}" id="product-dkp" type="text" name="dkp" class="form-control w-full" />
      </div>
      <div>
        <label for="product-dkpc" class="form-label">کد تنوع</label>
        <input value="${dkpc}" id="product-dkpc" type="text" name="dkpc" class="form-control w-full" />
      </div>
      <div>
        <label for="product-width" class="form-label">طول</label>
        <input value="${width}" id="product-width" type="text" name="width" class="form-control w-full" />
      </div>
      <div>
        <label for="product-height" class="form-label">عرض</label>
        <input value="${height}" id="product-height" type="text" name="height" class="form-control w-full" />
      </div>
      <div>
        <label for="product-count" class="form-label">موجودی</label>
        <input value="${count}" id="product-count" type="text" name="count" class="form-control w-full" />
      </div>
  
      <div>
        <label for="product-color" class="form-label">رنگ</label>
        <select name="color" id="product-color" class="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <option value="none" selected disabled hidden>انتخاب رنگ</option>
          ${optionColors.join("")}
        </select>
      </div>
  
      <div>
        <label for="product-category" class="form-label">دسته بندی</label>
        <select name="category"
          id="product-category"
          class="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="none" selected disabled hidden>انتخاب دسته بندی</option>
          ${optionCategory.join("")}
        </select>
      </div>
  
      <div>
        <label for="product-seller" class="form-label">فروشنده</label>
        <select name="seller"
          id="product-seller"
          class="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="none" selected disabled hidden>انتخاب فروشنده</option>
          ${optionSeller.join("")}
        </select>
      </div>
  
      <div>
        <label for="crud-form-1" class="form-label">تصویر</label>
        <input type="file" name="img" id="prodcut-img"class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4" />
      </div>
    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "بروزرسانی محصول",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert)
    // preConfirm: async () => {
    //   const productTitleElem = document.querySelector("#product-title");
    //   const productDkpElem = document.querySelector("#product-dkp");
    //   const productDkpcElem = document.querySelector("#product-dkpc");
    //   const productWidthElem = document.querySelector("#product-width");
    //   const productHeightElem = document.querySelector("#product-height");
    //   const productCountElem = document.querySelector("#product-count");
    //   const productColorElem = document.querySelector("#product-color");
    //   const productCategoryElem = document.querySelector("#product-category");
    //   const productSellerElem = document.querySelector("#product-seller");
    //   const productImgElem = document.querySelector("#prodcut-img");

    //   const formData = new FormData();
    //   formData.append("title", productTitleElem.value.trim());
    //   formData.append("dkp", productDkpElem.value.trim());
    //   formData.append("dkpc", productDkpcElem.value.trim());
    //   formData.append("width", productWidthElem.value.trim());
    //   formData.append("height", productHeightElem.value.trim());
    //   formData.append("count", productCountElem.value.trim());
    //   formData.append("color", productColorElem.options[productColorElem.selectedIndex].value);
    //   formData.append("category", productCategoryElem.options[productCategoryElem.selectedIndex].value);
    //   formData.append("seller", productSellerElem.options[productSellerElem.selectedIndex].value);
    //   formData.append("img", productImgElem.files[0]);

    //   const res = await fetch(`${apiUrl}/products/${_id}`, { method: "PUT", body: formData });

    //   const result = await res.json();
    //   if (res.ok) {
    //     Swal.fire({
    //       title: "بروزرسانی شد",
    //       text: result.message,
    //       icon: "success",
    //       confirmButtonText: "باشه",
    //     }).then((res) => {
    //       window.location.href = "/panel/products";
    //     });
    //   } else {
    //     Swal.fire({
    //       title: "خطا",
    //       text: "بروزرسانی محصول با خطا مواجه شد",
    //       icon: "error",
    //       confirmButtonText: "باشه",
    //     }).then((res) => {
    //       window.location.href = "/panel/products";
    //     });
    //   }
    // },

    // Way 2 => send data form (error handler flash) => OK
    preConfirm: async () => {
      document.querySelector("form").submit();
    },
  });
}
