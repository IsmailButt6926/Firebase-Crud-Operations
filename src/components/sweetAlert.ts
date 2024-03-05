// import Swal from "sweetalert2";

// const DeleteConfirmation = () => {
//   return Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success",
//       });
//     }
//   });
// };
// export default DeleteConfirmation;

import Swal from "sweetalert2";

const DeleteConformation = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#212224",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    iconColor: "#212224",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      return true;
    } else {
      return false;
    }
  });
};

export default DeleteConformation;

// import Swal from "sweetalert2";

// const DeleteConformation = () => {
//   return Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success",
//       });
//     }
//   });
// };

// export default DeleteConformation;
