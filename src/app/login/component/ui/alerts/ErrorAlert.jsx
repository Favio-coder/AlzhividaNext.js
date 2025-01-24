import Swal from 'sweetalert2';

const ErrorAlert = ({ text, reload }) => {
    Swal.fire({
        title: '¡Error!',
        text: text || 'Ocurrió un error inesperado.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        willClose: (reload) =>{
            if(reload){
                window.location.reload()
            }
        }
    });
};

export default ErrorAlert;
