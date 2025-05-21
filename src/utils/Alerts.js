import Swal from 'sweetalert2/dist/sweetalert2.all'
const colorSuccess = "#046c4e"
const colorDanger = "#e60000"

export const ErrorAlert = (title, message,) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: colorDanger,
    })
}

export const SuccessAlert = (message) => {
    Swal.fire({
        icon: 'success',
        position: "top-end",
        text: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
}

export const AlertWithResponse = (title, message, successFunction) => {
    Swal.fire({
        icon: "question",
        title: title,
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: colorSuccess,
        cancelButtonText: 'Cancel',
        cancelButtonColor: colorDanger,
    }).then(result =>{
        if (result.isConfirmed) {
            // 
            successFunction();
        }
    })
}