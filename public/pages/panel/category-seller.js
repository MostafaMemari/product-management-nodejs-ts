async function btnNewColor() {
  Swal.fire({
    title: "ثبت رنگ جدید",
    width: "400px",
    html: `
    <form action="/api/v1/colors/form" method="post" id="form" novalidate="novalidate">
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  p-5">
      <div>
        <label for="color-name" class="form-label">نام رنگ</label>
        <input id="color-name" type="text" name="name" class="form-control w-full" />
      </div>
    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "ثبت رنگ",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    preConfirm: async () => {
      const colorNameElem = document.querySelector("#color-name");

      const newColor = {
        name: colorNameElem.value.trim(),
      };

      const res = await fetch(`${apiUrl}/colors`, {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newColor),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "ثبت شد",
          text: result.message,
          icon: "success",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: "ثبت رنگ با خطا مواجه شد",
          icon: "error",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      }
    },

    // Way 2 => send data form (error handler flash) => OK
    // preConfirm: async () => {
    //   document.querySelector("form").submit();
    // },
  });
}
async function btnRemoveColor(colorID) {
  swalBtnDelete
    .fire({
      width: "450px",
      title: "آیا از حذف رنگ اطمینان دارید؟",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${apiUrl}/colors/${colorID}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok) {
          Swal.fire({
            title: "حذف شد",
            text: result.message,
            icon: "success",
            confirmButtonText: "باشه",
          }).then((res) => {
            window.location.href = "/panel/category-color";
          });
        }
      }
    });
}
async function btnUpdateColor(colorEncode) {
  const color = JSON.parse(decodeURIComponent(colorEncode));
  const { _id, name } = color;

  Swal.fire({
    title: "بروزرسانی رنگ",
    width: "400px",
    html: `
    <form action="/api/v1/colors/form" method="post" id="form" novalidate="novalidate">
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  p-5">
      <div>
        <label for="color-name" class="form-label">نام رنگ</label>
        <input value="${name}" id="color-name" type="text" name="name" class="form-control w-full" />
      </div>
    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "بروزرسانی رنگ",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    preConfirm: async () => {
      const colorNameElem = document.querySelector("#color-name");

      const newColor = {
        name: colorNameElem.value.trim(),
      };

      const res = await fetch(`${apiUrl}/colors/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newColor),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "بروزرسانی شد",
          text: result.message,
          icon: "success",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: "بروزرسانی رنگ با خطا مواجه شد",
          icon: "error",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      }
    },

    // Way 2 => send data form (error handler flash) => OK
    // preConfirm: async () => {
    //   document.querySelector("form").submit();
    // },
  });
}

async function btnNewCategory() {
  Swal.fire({
    title: "ثبت دسته بندی جدید",
    width: "400px",
    html: `
    <form action="/api/v1/category/form" method="post" id="form" novalidate="novalidate">
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  p-5">
      <div>
        <label for="category-name" class="form-label">نام دسته بندی</label>
        <input id="category-name" type="text" name="name" class="form-control w-full" />
      </div>
    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "ثبت دسته بندی",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    preConfirm: async () => {
      const categoryNameEelem = document.querySelector("#category-name");

      const newCategory = {
        name: categoryNameEelem.value.trim(),
      };

      const res = await fetch(`${apiUrl}/category`, {
        method: "POST",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newCategory),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "ثبت شد",
          text: result.message,
          icon: "success",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: "ثبت دسته بندی با خطا مواجه شد",
          icon: "error",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      }
    },

    // Way 2 => send data form (error handler flash) => OK
    // preConfirm: async () => {
    //   document.querySelector("form").submit();
    // },
  });
}
async function btnRemoveCategory(colorID) {
  swalBtnDelete
    .fire({
      width: "450px",
      title: "آیا از حذف دسته بندی اطمینان دارید؟",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${apiUrl}/category/${colorID}`, { method: "DELETE" });
        const result = await res.json();
        if (res.ok) {
          Swal.fire({
            title: "حذف شد",
            text: result.message,
            icon: "success",
            confirmButtonText: "باشه",
          }).then((res) => {
            window.location.href = "/panel/category-color";
          });
        }
      }
    });
}
async function btnUpdateCategory(colorEncode) {
  const category = JSON.parse(decodeURIComponent(colorEncode));
  const { _id, name } = category;

  Swal.fire({
    title: "بروزرسانی دسته بندی",
    width: "400px",
    html: `
    <form action="/api/v1/category/form" method="post" id="form" novalidate="novalidate">
    <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  p-5">
      <div>
        <label for="category-name" class="form-label">نام دسته بندی</label>
        <input value="${name}" id="category-name" type="text" name="name" class="form-control w-full" />
      </div>
    </div>
  </form>
    `,

    showCancelButton: true,
    confirmButtonText: "بروزرسانی دسته بندی",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#e6af0b",
    focusConfirm: false,

    // Way 1 => send data api (error handler sweetalert) => OK
    preConfirm: async () => {
      const categoryNameElem = document.querySelector("#category-name");

      const newCategory = {
        name: categoryNameElem.value.trim(),
      };

      const res = await fetch(`${apiUrl}/category/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(newCategory),
      });

      const result = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "بروزرسانی شد",
          text: result.message,
          icon: "success",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      } else {
        Swal.fire({
          title: "خطا",
          text: "بروزرسانی دسته بندی با خطا مواجه شد",
          icon: "error",
          confirmButtonText: "باشه",
        }).then((res) => {
          window.location.href = "/panel/category-color";
        });
      }
    },

    // Way 2 => send data form (error handler flash) => OK
    // preConfirm: async () => {
    //   document.querySelector("form").submit();
    // },
  });
}
