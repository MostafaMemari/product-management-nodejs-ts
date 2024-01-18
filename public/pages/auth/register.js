const btnRegisterUser = document.querySelector("#btn-register-user");

btnRegisterUser.addEventListener("click", () => {
  const fullName = document.querySelector("#full-name").value.trim();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const email = document.querySelector("#email").value.trim();
  const confirmPassword = document.querySelector("#confirm-password").value.trim();

  fetch(`${apiUrl}/auth/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, username, password, email, confirmPassword }),
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
      if (result.status == 409) {
        Swal.fire({
          title: "نا موفق",
          text: result.message,
          icon: "error",
          confirmButtonText: "ویرایش اطلاعات",
        });
      } else if (result.status !== 200) {
        Swal.fire({
          title: "نا موفق",
          text: "لطفا در وارد کردن مقادیر دقت فرمایید",
          icon: "error",
          confirmButtonText: "ویرایش اطلاعات",
        });
      }
    });
});
