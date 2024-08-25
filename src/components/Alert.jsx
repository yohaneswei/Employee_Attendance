import React from 'react'
import swal from 'sweetalert2';

const Alert = (status, title, text, functionFn) => {
    swal.fire({
        icon: status,
        title: title,
        text: text,
        confirmButtonColor: "#3399FF",
    }).then(functionFn)
}

export default Alert
