function showAlert(alertClass, message) {
  alertBox.style.display = "block";
  alertBox.style.opacity = 100;
  alertBox.setAttribute("class", `alert ${alertClass}`);
  alertBox.innerHTML = message;

  setTimeout(function () {
    alertBox.style.opacity = 0;
    alertBox.classList.remove(alertClass);
  }, 2500);
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 3000);
}

function resetInput() {
  const input = document.getElementsByTagName("input");
  for (var i = 0; i < input.length; i++) {
    if (input[i].type == "text") {
      input[i].value = "";
    }
  }
  // const selectBox = document.getElementsByTagName("select");
  // for (var i = 0; i < selectBox.length; i++) {
  //   selectBox[i].value = "none";
  // }
  // colorSelectBox.value = "none";
  // categorieSelectBox.value = "none";
  // sellerSelectBox.value = "none";
  // minInputSearch.value = "";
}

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
