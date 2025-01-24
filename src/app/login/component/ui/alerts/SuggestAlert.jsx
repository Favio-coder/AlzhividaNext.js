import Swal from 'sweetalert2';


const SuggestAlert = ({ text }) => {
    Swal.fire({
        title: '¡Recuerda!',
        text: text || 'Ocurrió un error inesperado.',
        icon: 'info',
        confirmButtonText: 'Entendido',
    });
};

export default SuggestAlert;
