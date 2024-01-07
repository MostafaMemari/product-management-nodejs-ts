async function btnShowRobot() {
  await Swal.fire({
    title: "تنظیمات ربات",
    width: "700px",
    html: `
    <table class="table-robot">
      <thead>
        <tr>
          <th>ربات</th>
          <th>بای باکس</th>
          <th>افزایش قیمت</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <label class="switch">
            <input type="checkbox" checked/>
            <span class="slider round"></span>
            </label>
          </td>
          <td>
            <label class="switch">
            <input type="checkbox" checked/>
            <span class="slider round"></span>
            </label>
          </td>
          <td>
            <label class="switch">
            <input type="checkbox" checked/>
            <span class="slider round"></span>
            </label>
          </td>

        </tr>
      </tbody>
    </table>
    <table class="table-robot">
      <thead>
        <tr>
          <th>ربات</th>
          <th>بای باکس</th>
          <th>افزایش قیمت</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" name="" value="" />
          </td>
          <td>
            <input type="text" name="" value="" />
          </td>
          <td>
            <input type="text" name="" value="" />
          </td>

        </tr>
      </tbody>
    </table>
    `,
    showConfirmButton: false,
  });
}

async function btnSaveRobot(event, productID) {
  const documentRobot = event.target.parentElement.parentElement;
  const inputReducePrice = documentRobot.querySelector("#input-reduce-price").value;
  const inputMinPrice = documentRobot.querySelector("#input-min-price").value;
  const inputMaxPrice = documentRobot.querySelector("#input-max-price").value;
  const isActiveSwitch = documentRobot.querySelector("#switch-is-active").checked;
  const isBuyboxSwitch = documentRobot.querySelector("#switch-is-buybox").checked;
  const isCheckPriceSwitch = documentRobot.querySelector("#switch-is-checkprice").checked;

  fetch(`${apiUrl}/products/${productID}/robot`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reducePrice: +inputReducePrice,
      maxPrice: +inputMaxPrice,
      minPrice: +inputMinPrice,
      isActive: isActiveSwitch,
      isBuyBox: isBuyboxSwitch,
      isCheckPrice: isCheckPriceSwitch,
    }),
  }).then((res) => {
    if (res.status) {
      document.location.href = `/panel/robot`;
    }
  });
}
