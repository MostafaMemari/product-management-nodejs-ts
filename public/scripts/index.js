const searchInput = document.querySelector(".search-input");
const countInput = document.querySelector(".input-number");
const alertBox = document.querySelector(".alert");
const messageSuccess = document.querySelector(".message-success").innerHTML;
const messageError = document.querySelector(".message-error").innerHTML;

const apiUrl = "http://localhost:4500/api/v1";

window.addEventListener("load", () => {
  resetInput();
  searchInput.focus();

  if (messageSuccess || messageError) {
    Toast.fire({
      icon: messageSuccess ? "success" : "error",
      title: messageSuccess ? messageSuccess : messageError,
    });
  }
});

searchInput.addEventListener("keypress", function searchInputChange(event) {
  if (event.key == "Enter") {
    const pathName = window.location.pathname.split("/")[2];
    document.location.href = `/panel/${pathName}/?search=${searchInput.value}`;
  }
});
