import Swal from 'sweetalert2';

const ErrorAlert = ({ text }) => {
    Swal.fire({
        title: '¡Error!',
        text: text || 'Ocurrió un error inesperado.',
        icon: 'error',
        confirmButtonText: 'Entendido',
    });
};

export default ErrorAlert;
