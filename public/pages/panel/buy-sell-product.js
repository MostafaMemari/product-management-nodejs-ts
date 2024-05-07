const operationPage = (pageInfo == "خرید محصول" && "خرید") || (pageInfo == "فروش محصول" && "فروش");

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

const inputLtCount = document.getElementById("input-lt-count");
const inputGtCount = document.getElementById("input-gt-count");
const selectCount = document.getElementById("select-count");
const selectSort = document.getElementById("select-sort");

const loader = document.getElementById("loader");

inputSearch.addEventListener("change", updateResults);
selectLimit.addEventListener("change", updateResults);
colorSelectBox.addEventListener("change", updateResults);
categorySelectBox.addEventListener("change", updateResults);
sellerSelectBox.addEventListener("change", updateResults);
searchBtn.addEventListener("click", updateResults);

inputLtCount.addEventListener("change", updateResults);
inputGtCount.addEventListener("change", updateResults);
selectCount.addEventListener("change", updateResults);
selectSort.addEventListener("change", updateResults);

function updateResults(pageNumber = 1) {
  let queryString = "";

  const searchValue = inputSearch.value.trim();
  const selectedLimit = selectLimit.value;

  const ltCountValue = inputLtCount.value;
  const gtCountValue = inputGtCount.value;
  const selectSortCount = selectCount.value;
  const selectSortUpdate = selectSort.value;

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

  if (gtCountValue.length > 0) {
    queryString += (queryString ? "&" : "") + `gtCount=${gtCountValue}`;
  }
  if (ltCountValue.length > 0) {
    queryString += (queryString ? "&" : "") + `ltCount=${ltCountValue}`;
  }
  if (selectSortCount.length > 0) {
    queryString += (queryString ? "&" : "") + `sortCount=${selectSortCount}`;
  }
  if (selectSortUpdate.length > 0) {
    queryString += (queryString ? "&" : "") + `sort=${selectSortUpdate}`;
  }

  queryString += (queryString ? "&" : "") + `page=${!isNaN(pageNumber) ? pageNumber : 1}`;

  history.replaceState({ data: "some data" }, "New Title", `/panel/products-buy?${queryString}`);
  getAndShowListProducts(`?${queryString}`);
}

async function getAndShowListProducts(query = "") {
  loader.classList.remove("hidden");
  inputSearch.focus();
  const res = await fetch(`${apiUrl}/products/report/${(operationPage == "خرید" && "buy") || (operationPage == "فروش" && "sell")}/${query}`);
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
            title="آخرین ${operationPage} : ${product?.report[0]?.lastOperation.count} عدد ساعت ${product?.report[0]?.lastOperation?.hour} تاریخ ${
        product?.report[0]?.lastOperation?.date
      }"
          >
            <div class="flex flex-col items-center p-5">
              <div class="w-28 h-28 image-fit">
                <img class="rounded-full image-fit" alt="" class="rounded-full" src="https://bocket-product.storage.iran.liara.space${product?.img}" />
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
                  ${product?.report[0]?.sumCountAll ? `${operationPage} کل : ${product?.report[0]?.sumCountAll} عدد` : `${operationPage}ی ثبت نشده`}
                  </div>
                </div>
    
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <div class="text-gray-600 text-xs mt-0.5">
                  ${
                    product?.report[0]?.sumCountMonth
                      ? ` ${product?.report[0]?.sumCountMonth} عدد ${operationPage} در ماه گذشته`
                      : `${operationPage}ی در ماه گذشته صورت نگرفته`
                  }
                  </div>
                </div>
    
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <input onkeypress="inputBuyAndSell(event , '${product._id}', '${
        (operationPage == "خرید" && "buy") || (operationPage == "فروش" && "sell")
      }')" type="number" class="form-control w-3/5" placeholder="تعداد" />
                  <select
                    id="select-box-buy"
                    class="form-select appearance-none block w-3/5 h-10 text-gray-700 bg-white border m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option selected value="${operationPage}">${operationPage}</option>
                    <option value="خرابی">خرابی</option>
                  </select>
                </div>
    
                <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-3 mt-2">
                  <button onclick="btnBuyAndSell(event , '${product._id}', '${
        (operationPage == "خرید" && "buy") || (operationPage == "فروش" && "sell")
      }')" class="btn btn-primary w-3/5 h-10 order-last sm:order-first">ثبت</button>
    
                  <button onclick="btnShowReportBuyAndSell('${product._id}', '${
        (operationPage == "خرید" && "buy") || (operationPage == "فروش" && "sell")
      }')" class="btn btn-outline-secondary w-3/5 h-10">گزارش</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
    );
  });

  const { page, limit, pages, total } = result.data;
  createPaginationHtmlByPageInfo({ page, limit, pages, total });
}

function createPaginationHtmlByPageInfo(pageInfo) {
  const { total, page, pages, limit } = pageInfo;

  const paginationBody = document.querySelector(".pagination");

  paginationBody.innerHTML = "";

  const btnPrev = `
  <li>
    <a class="pagination__link" data-page="prev">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
    <g><g><path fill="#000000" d="M189.2,120.4L81.9,13.1C77.7,9,71,9,66.8,13.1c-4.2,4.2-4.2,10.9,0,15.1l99.8,99.8l-99.8,99.8c-4.2,4.2-4.2,10.9,0,15c2.1,2.1,4.8,3.1,7.5,3.1c2.7,0,5.4-1,7.5-3.1l107.3-107.3c2.1-2.1,3.1-4.9,3.1-7.6C192.3,125.3,191.3,122.5,189.2,120.4z"/></g></g>
    </svg>
    </a>
  </li>
`;
  const btnNext = `
  <li>
    <a class="pagination__link" data-page="next">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
    <g><g><path fill="#000000" d="M66.8,120.4L174.1,13.1c4.2-4.2,10.9-4.2,15,0c4.2,4.2,4.2,10.9,0,15L89.3,128l99.8,99.8c4.2,4.2,4.2,10.9,0,15c-2.1,2.1-4.8,3.1-7.5,3.1s-5.4-1-7.5-3.1L66.8,135.6c-2.1-2.1-3.1-4.9-3.1-7.6C63.7,125.3,64.7,122.5,66.8,120.4z"/></g></g>
    </svg>
    </a>
  </li>
`;

  let pagination = "";
  if (page - 3 < 1) {
    page != 1 && (pagination += btnPrev);
    if (pages <= 4) {
      for (let i = 1; i <= pages; i++) {
        pagination += `
        <li>
          <a class="pagination__link ${i == page && "pagination__link--active"}" data-page="${i}">${i}</a>
        </li>
        `;
      }
      page != pages && pages >= 1 && (pagination += btnNext);
    } else {
      for (let i = 1; i <= 4; i++) {
        pagination += `
        <li>
          <a class="pagination__link ${i == page && "pagination__link--active"}" data-page="${i}">${i}</a>
        </li>
        `;
      }

      pagination += `
      <li><a class="pagination__link" data-page="5">...</a></li>
      <li><a class="pagination__link" data-page="${pages}">${pages}</a></li>
       ${btnNext}`;
    }
  } else if (Number(page) + 3 > pages && page <= pages) {
    pagination += `${btnPrev} 
        ${
          pages !== 4
            ? `<li><a class="pagination__link" data-page="1">1</a></li>
          <li><a class="pagination__link"  data-page="${pages - 5}">...</a></li>`
            : ""
        }

        `;

    for (let i = pages - 3; i <= pages; i++) {
      pagination += `
      <li>
        <a class="pagination__link ${i == page && "pagination__link--active"}" data-page="${i}">${i}</a>
      </li>
      `;
    }
    page != pages && (pagination += btnNext);
  } else if (page >= 4 && page <= pages) {
    pagination += `${btnPrev} 
      <li><a class="pagination__link" data-page="1">1</a></li>
      <li><a class="pagination__link" data-page="${pages - 3}" >...</a></li>
      `;

    for (let i = page - 2; Number(page) + 2 >= i; i++) {
      pagination += `
      <li>
        <a class="pagination__link ${i == page && "pagination__link--active"}" data-page="${i}">${i}</a>
      </li>
          `;
    }
    pagination += `
      <li><a class="pagination__link" data-page="${pages + 3}">...</a></li>
      <li><a class="pagination__link" data-page="${pages}">${pages}</a></li>
       ${btnNext}`;
  }

  paginationBody.insertAdjacentHTML("beforeend", pagination);

  const limitBody = document.getElementById("select-limit");
  limitBody.innerHTML = "";
  const valueOption = ["10", "15", "30", "50", "100"];
  limitBody.insertAdjacentHTML(
    "beforeend",
    `
    ${valueOption.map((option) => `<option ${option == limit && "selected"} value="${option}">${option}</option>`)}
    `
  );

  const paginationLinks = document.querySelectorAll(".pagination a");
  renderPagination(paginationLinks);
}

function renderPagination(paginationLinks) {
  paginationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const currentPage = link.dataset.page;
      let pageNumber = 1;

      if (currentPage === "prev") {
        pageNumber = Math.max(1, parseInt(getQueryParameters().page) - 1);
      } else if (currentPage === "next") {
        pageNumber = parseInt(getQueryParameters().page) + 1;
      } else {
        pageNumber = parseInt(currentPage);
      }

      document.getElementById("scroll").scrollIntoView({ behavior: "smooth" });
      updateResults(pageNumber);
    });
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

async function btnShowReportBuyAndSell(productID, operation) {
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
    title: operation === "buy" ? "گزارش خرید" : "گزارش فروش",
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
      title: `${operationPath == "buy" ? `خرید` : `فروش`} با خطا مواجه شد`,
    });
  }
}
