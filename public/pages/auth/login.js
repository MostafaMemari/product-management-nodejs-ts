const btnLoginUser = document.querySelector("#btn-login-user");

btnLoginUser.addEventListener("click", () => {
  const identifier = document.querySelector("#identifier").value.trim();
  const password = document.querySelector("#password").value.trim();

  fetch(`${apiUrl}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.status == 200) {
        Swal.fire({
          title: "موفق آمیز",
          text: result.message,
          icon: "success",
          confirmButtonText: "ورود به پنل مدیریت",
        }).then((res) => {
          window.location.href = "/panel/products";
        });
      }
      if (result.status == 401) {
        Swal.fire({
          title: "نا موفق",
          text: result.message,
          icon: "error",
          confirmButtonText: "ویرایش اطلاعات",
        });
      }
    });
});
