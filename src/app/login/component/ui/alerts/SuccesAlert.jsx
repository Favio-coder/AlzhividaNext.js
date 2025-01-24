import Swal from 'sweetalert2';


const SuccesAlert = ({ text, redirectUrl }) => {


    Swal.fire({
        title: 'Exito',
        text: text || 'Ocurrió un error inesperado.',
        icon: 'success',
        confirmButtonText: 'Entendido',
        willClose: () =>{ 
            if(redirectUrl){
                window.location.href = redirectUrl
            }
        }
    });
};

export default SuccesAlert;
