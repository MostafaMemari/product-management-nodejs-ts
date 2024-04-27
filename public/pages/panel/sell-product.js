window.addEventListener("load", () => {
  document.querySelector("#input-search").focus();

  const queryString = window.location.search;

  getAndShowListProducts(queryString);
});

const inputSearch = document.getElementById("input-search");
const selectLimit = document.getElementById("select-limit");
const colorSelectBox = document.getElementById("color-select-box");
const categorySelectBox = document.getElementById("category-select-box");
const sellerSelectBox = document.getElementById("seller-select-box");
const searchBtn = document.getElementById("btn-search");

const loader = document.getElementById("loader");

inputSearch.addEventListener("change", updateResults);
selectLimit.addEventListener("change", updateResults);
colorSelectBox.addEventListener("change", updateResults);
categorySelectBox.addEventListener("change", updateResults);
sellerSelectBox.addEventListener("change", updateResults);
searchBtn.addEventListener("click", updateResults);

function updateResults() {
  let queryString = "";

  const searchValue = inputSearch.value.trim();
  const selectedLimit = selectLimit.value;
  const selectedColor = Array.from(colorSelectBox.selectedOptions).map((option) => option.innerHTML);
  const selectedCategory = Array.from(categorySelectBox.selectedOptions).map((option) => option.innerHTML);
  const selectedSeller = Array.from(sellerSelectBox.selectedOptions).map((option) => option.innerHTML);

  if (searchValue) {
    queryString += `search=${searchValue}`;
  }
  if (selectedLimit.length > 0) {
    queryString += (queryString ? "&" : "") + `limit=${selectedLimit}`;
  }
  if (selectedColor.length > 0) {
    queryString += (queryString ? "&" : "") + `color=${selectedColor.join(",")}`;
  }
  if (selectedCategory.length > 0) {
    queryString += (queryString ? "&" : "") + `category=${selectedCategory.join(",")}`;
  }
  if (selectedSeller.length > 0) {
    queryString += (queryString ? "&" : "") + `seller=${selectedSeller.join(",")}`;
  }

  history.replaceState({ data: "some data" }, "New Title", `/panel/products-buy?${queryString}`);
  getAndShowListProducts(`?${queryString}`);
}

async function getAndShowListProducts(query = "") {
  loader.classList.remove("hidden");
  inputSearch.focus();
  const res = await fetch(`${apiUrl}/products/report/sell/${query}`);
  const result = await res.json();
  loader.classList.add("hidden");

  const cardBody = document.getElementById("card-product");

  cardBody.innerHTML = "";

  result.data.products.forEach((product) => {
    cardBody.insertAdjacentHTML(
      "beforeend",
      `
        <div class="intro-y zoom-in">
          <div
            class="box h-full tooltip"
            data-theme="light"
            title="آخرین فروش : ${product?.report?.lastOperation.count} عدد ساعت ${product?.report?.lastOperation?.hour} تاریخ ${
        product?.report?.lastOperation?.date
      }"
          >
            <div class="flex flex-col items-center p-5">
              <div class="w-28 h-28 image-fit">
                <img class="rounded-full image-fit" alt="" class="rounded-full" src="${product.img}" />
              </div>
    
              <div class="text-center mt-3">
                <a
                  href="https://www.digikala.com/product/dkp-${product.dkp}"
                  target="_blank"
                  class="flex justify-center items-center font-medium line-clamp-2 h-10"
                  title="${product.title}">${product.title}</a>
              </div>
    
              <div class="flex flex-col w-full justify-center items-center">
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <div class="text-gray-600 text-xs mt-0.5 whitespace-nowrap">
                    موجودی <span class="text-red-500 font-bold mt-0.5"> : ${product.count} عدد</span>
                  </div>
                  <div class="text-gray-600 text-xs mt-0.5 whitespace-nowrap">
<<<<<<< Updated upstream:public/pages/panel/sell-product.js
                  ${product?.report?.sumCountAll ? `فروش کل : ${product?.report?.sumCountAll} عدد` : "فروشی ثبت نشده"}
=======
                  ${product?.report?.sumCountAll ? `خرید کل : ${product?.report?.sumCountAll} عدد` : "خریدی ثبت نشده"}
>>>>>>> Stashed changes:public/pages/panel/buy-product.js
                  </div>
                </div>
    
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <div class="text-gray-600 text-xs mt-0.5">
<<<<<<< Updated upstream:public/pages/panel/sell-product.js
                  ${product?.report?.sumCountMonth ? ` ${product?.report?.sumCountMonth} عدد فروش در ماه گذشته` : "فروشی در ماه گذشته صورت نگرفته"}
=======
                  ${product?.report?.sumCountMonth ? ` ${product?.report?.sumCountMonth} عدد خرید در ماه گذشته` : "خریدی در ماه گذشته صورت نگرفته"}
>>>>>>> Stashed changes:public/pages/panel/buy-product.js
                  </div>
                </div>
    
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <input onkeypress="inputBuyAndSell(event , '${product._id}', 'sell')" type="number" class="form-control w-3/5" placeholder="تعداد" />
                  <select
                    id="select-box-buy"
                    class="form-select appearance-none block w-3/5 h-10 text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option selected value="فروش">فروش</option>
                    <option value="خرابی">خرابی</option>
                  </select>
                </div>
    
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <button onclick="btnBuyAndSell(event , '${product._id}', 'sell')" class="btn btn-primary w-3/5 h-10 order-last sm:order-first">ثبت</button>
    
                  <button onclick="btnShowreportSellAndSell('${product._id}', 'sell')" class="btn btn-outline-secondary w-3/5 h-10">گزارش</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
    );
  });
}

function inputBuyAndSell(event, productID, operationPath) {
  if (event.key == "Enter") {
    const count = event.target.parentElement.parentElement.querySelector("input").value;

    const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
    const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

    apiBuyProduct(productID, count, operationPath, operation);
  }
}
function btnBuyAndSell(event, productID, operationPath) {
  const count = event.target.parentElement.parentElement.querySelector("input").value;

  const selectBoxBuyAndSell = event.target.parentElement.parentElement.querySelector("select");
  const operation = selectBoxBuyAndSell.options[selectBoxBuyAndSell.selectedIndex].text;

  apiBuyProduct(productID, count, operationPath, operation);
}

async function btnShowreportSellAndSell(productID, operation) {
  const res = await fetch(`${apiUrl}/buy-sell/product/${productID}/report/${operation}`);
  const result = await res.json();
  const label = result.data.map((elem) => elem.date);
  const data = result.data.map((elem) => elem.count);

  let cardDate = null;
  cardDate = Object.entries(result.data).map(
    (key) => `
          <div class="flex flex-col items-center justify-center p-4 zoom-in ${
            operation === "sell" && key[1].operation === "دپو"
              ? "bg-green-50"
              : operation === "sell" && key[1].operation === "خرابی"
              ? "bg-red-50"
              : operation === "sell" && key[1].operation === "فروش"
              ? "bg-slate-50"
              : "bg-slate-50"
          }  w-32 h-28">
          <div class="font-medium  text-base">${key[1].date}</div>
            <div class="font-medium  text-base">${key[1].hour}</div>
            <div class="text-gray-600">${key[1].count} عدد</div>
          </div>
      `
  );
  Swal.fire({
    title: operation === "buy" ? "گزارش فروش" : "گزارش فروش",
    width: "90%",
    html: `
    <div class="flex flex-col lg:flex-row ">
      <div class="flex justify-center items-center flex-wrap gap-3 w-full lg:w-1/2">
        ${cardDate.join("")}
      </div>
      <div class="w-full lg:w-1/2">
        <canvas id="line-chart-widget"></canvas>
      </div>
    </div>
    `,
    showCancelButton: false,
    showConfirmButton: false,
  });
  initChartLine(label.reverse(), data.reverse(), document.querySelector("#line-chart-widget").getContext("2d"));
}
async function apiBuyProduct(productID, count, operationPath, operation) {
  const response = await fetch(`${apiUrl}/buy-sell/product/${productID}/${operationPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ count, operation, status: operationPath }),
  });

  params.delete("search");
  params.delete("page");

  const searchQuery = "";

  const pathQuery = params.size ? `?${params.toString()}${searchQuery ? `&${searchQuery}` : ""}` : `${searchQuery ? `?${searchQuery}` : ""}`;

  if (response.ok) {
    inputSearch.value = "";
    getAndShowListProducts(pathQuery);

    // document.location.href = operationPath == "buy" ? `/panel/products-buy/${pathQuery}` : `/panel/products-sell/${pathQuery}`;
  } else {
    Toast.fire({
      icon: "error",
      title: `${operationPath == "buy" ? `فروش` : `فروش`} با خطا مواجه شد`,
    });
  }
}
