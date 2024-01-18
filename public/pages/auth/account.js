const btnUserAcc = document.querySelector("#btn-user-acc");

btnUserAcc.addEventListener("click", async () => {
  const fullName = document.querySelector("#fullName");
  const role = document.querySelector("#role");

  const res = await fetch(`${apiUrl}/auth/getMe`);
  const result = await res.json();

  fullName.innerHTML = result.user.fullName;
  role.innerHTML = result.user.role === "USER" ? "کاربر عادی" : "مدیرسایت";
});

// btnLogout.addEventListener("click", async () => {
//   await fetch(`${apiUrl}/auth/logout`);
// });
