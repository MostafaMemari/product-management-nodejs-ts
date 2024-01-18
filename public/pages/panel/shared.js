const categorieSelectBox = document.querySelector("#category-select-box");
const sellerSelectBox = document.querySelector("#seller-select-box");
const colorSelectBox = document.querySelector("#color-select-box");

const url = new URL(window.location);
const params = new URLSearchParams(url.search);

async function inputSearchEnter(event) {
  if (event.key === "Enter") {
    params.delete("search");
    params.delete("page");

    const searchQuery = event.target.value ? `search=${event.target.value}&page=1` : "";

    const pathQuery = params.size
      ? `?${params.toString()}${searchQuery ? `&${searchQuery}` : ""}`
      : `${searchQuery ? `?${searchQuery}` : ""}`;

    window.location = url.pathname + pathQuery;
  }
}

async function selectBoxCategory(event) {
  const optionsSelected = event.target.querySelectorAll("option");
  let categories = [];
  optionsSelected.forEach((option) => {
    if (option.selected) {
      categories.push(option.value);
    }
  });
  params.delete("category");
  params.delete("page");
  const categoryQuery = categories.length ? `category=${categories.join(",")}&page=1` : "";

  const pathQuery = params.size
    ? `?${params.toString()}${categoryQuery ? `&${categoryQuery}` : ""}`
    : `${categoryQuery ? `?${categoryQuery}` : ""}`;
  window.location = url.pathname + pathQuery;
}
async function selectBoxColor(event) {
  const optionsSelected = event.target.querySelectorAll("option");

  let colors = [];
  optionsSelected.forEach((option) => {
    if (option.selected) {
      colors.push(option.value);
    }
  });

  params.delete("color");
  params.delete("page");
  const colorQuery = colors.length ? `color=${colors.join(",")}&page=1` : "";

  const pathQuery = params.size ? `?${params.toString()}${colorQuery ? `&${colorQuery}` : ""}` : `${colorQuery ? `?${colorQuery}` : ""}`;
  window.location = url.pathname + pathQuery;
}
async function selectBoxSeller(event) {
  const optionsSelected = event.target.querySelectorAll("option");
  let sellers = [];
  optionsSelected.forEach((option) => {
    if (option.selected) {
      sellers.push(option.value);
    }
  });
  params.delete("seller");
  params.delete("page");
  const sellerQuery = sellers.length ? `seller=${sellers.join(",")}&page=1` : "";

  const pathQuery = params.size
    ? `?${params.toString()}${sellerQuery ? `&${sellerQuery}` : ""}`
    : `${sellerQuery ? `?${sellerQuery}` : ""}`;

  window.location = url.pathname + pathQuery;
}
