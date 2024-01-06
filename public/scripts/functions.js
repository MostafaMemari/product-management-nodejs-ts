const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    cancelButton: "btn danger m5",
    confirmButton: "btn success m5",
  },
  buttonsStyling: false,
});

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
