const messageSuccess = document.querySelector(".message-success").innerHTML;
const messageError = document.querySelector(".message-error").innerHTML;

const apiUrl = "http://localhost:4600/api/v1";

window.addEventListener("load", () => {
  if (messageSuccess || messageError) {
    Toast.fire({
      icon: messageSuccess ? "success" : "error",
      title: messageSuccess ? messageSuccess : messageError,
    });
  }
});

const swalBtnDelete = Swal.mixin({
  icon: "warning",
  text: "بعد از حذف دیگه هیچ راه برگشتی نیست",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "حذف",
  cancelButtonText: "لغو",
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
