async function btnNewSeller() {
  Swal.fire({
    title: "ثبت فروشنده جدید",
    width: "400px",
    html: `
    <form action="/api/v1/sellers/form" method="post" id="form" novalidate="novalidate">
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-5 p-5">
      <div>
        <label for="seller-title" class="form-label">نام فروشنده</label>
        <input id="seller-title" type="text" name="sellerTitle" class="form-control w-full" />
      </div>
      <div>
        <label for="seller-id" class="form-label">شماره فروشندگی</label>
        <input id="seller-id" type="text" name="sellerID" class="form-control w-full" />
      </div>
      <div>
        <label for="seller-token" class="form-label">توکن</label>
        <input id="seller-token" type="text" name="token" class="form-control w-full" />
      </div>

      <div class="flex justify-center gap-4">
        <input name="isRobot" id="seller-is-robot" class="form-check-switch" type="checkbox">
        <label for="seller-is-robot" class="form-label">وضعیت ربات</label>
      </div>

    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "ثبت فروشنده",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    preConfirm: async () => {
      const sellerTitleElem = document.querySelector("#seller-title");
      const sellerIdElem = document.querySelector("#seller-id");
      const sellerTokenElem = document.querySelector("#seller-token");
      const sellerIsRobotElem = document.querySelector("#seller-is-robot");

      const newSeller = {
        sellerTitle: sellerTitleElem.value.trim(),
        sellerID: sellerIdElem.value.trim(),
        token: sellerTokenElem.value.trim(),
        isRobot: sellerIsRobotElem.checked,
      };

      const res = await fetch(`${apiUrl}/sellers`, {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newSeller),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "ثبت شد",
          text: result.message,
          icon: "success",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/sellers";
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: "ثبت فروشنده با خطا مواجه شد",
          icon: "error",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/sellers";
        });
      }
    },

    // Way 2 => send data form (error handler flash) => OK
    // preConfirm: async () => {
    //   document.querySelector("form").submit();
    // },
  });
}
async function btnRemoveSeller(sellerID) {
  swalBtnDelete
    .fire({
      width: "450px",
      title: "آیا از حذف فروشنده اطمینان دارید؟",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${apiUrl}/sellers/${sellerID}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok) {
          Swal.fire({
            title: "حذف شد",
            text: result.message,
            icon: "success",
            confirmButtonText: "باشه",
          }).then((res) => {
            window.location.href = "/panel/sellers";
          });
        }
      }
    });
}
async function btnUpdateSeller(sellerEncode) {
  const seller = JSON.parse(decodeURIComponent(sellerEncode));
  const { _id, sellerTitle, sellerID, token, isRobot } = seller;

  Swal.fire({
    title: "ویرایش فرشنده",
    width: "400px",
    html: `
    <form action="/api/v1/sellers/${_id}/form" method="post" id="form" novalidate="novalidate">
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-5 p-5">
      <div>
        <label for="seller-title" class="form-label">نام فروشنده</label>
        <input value="${sellerTitle}" id="seller-title" type="text" name="sellerTitle" class="form-control w-full" />
      </div>
      <div>
        <label for="seller-id" class="form-label">شماره فروشندگی</label>
        <input value="${sellerID}" id="seller-id" type="text" name="sellerID" class="form-control w-full" />
      </div>
      <div>
        <label for="seller-token" class="form-label">توکن</label>
        <input value="${token}" id="seller-token" type="text" name="token" class="form-control w-full" />
      </div>

      <div class="flex justify-center gap-4">
        <input ${isRobot ? "checked" : ""} name="isRobot" id="seller-is-robot" class="form-check-switch" type="checkbox">
        <label for="seller-is-robot" class="form-label">وضعیت ربات</label>
      </div>

    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "بروزرسانی",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    // preConfirm: async () => {
    //   const sellerTitleElem = document.querySelector("#seller-title");
    //   const sellerIdElem = document.querySelector("#seller-id");
    //   const sellerTokenElem = document.querySelector("#seller-token");
    //   const sellerIsRobotElem = document.querySelector("#seller-is-robot");

    //   const updateSeller = {
    //     sellerTitle: sellerTitleElem.value.trim(),
    //     sellerID: sellerIdElem.value.trim(),
    //     token: sellerTokenElem.value.trim(),
    //     isRobot: sellerIsRobotElem.checked,
    //   };

    //   const res = await fetch(`${apiUrl}/sellers/${_id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": `application/json`,
    //     },
    //     body: JSON.stringify(updateSeller),
    //   });

    //   const result = await res.json();
    //   if (res.ok) {
    //     Swal.fire({
    //       title: "ثبت شد",
    //       text: result.message,
    //       icon: "success",
    //       confirmButtonText: "باشه",
    //     }).then((res) => {
    //       window.location.href = "/panel/sellers";
    //     });
    //   } else {
    //     Swal.fire({
    //       title: "خطا",
    //       text: "بروزرسانی فروشنده با خطا مواجه شد",
    //       icon: "error",
    //       confirmButtonText: "باشه",
    //     }).then((res) => {
    //       window.location.href = "/panel/sellers";
    //     });
    //   }
    // },

    // Way 2 => send data form (error handler flash) => OK
    preConfirm: async () => {
      document.querySelector("form").submit();
    },
  });
}
