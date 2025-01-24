//Importar React 
import React, { useState } from "react";

//Importar componentes 
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ErrorAlert from "./alerts/ErrorAlert";
import SuccesAlert from "./alerts/SuccesAlert";

//Importar funciones
import { useEffect } from "react";
import { registerUser } from "../services/registerController";

export default function StepForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [activarAlerta, setActivarAlerta] = useState(false)
    const [activarExito, setActivarExito] = useState(false)
    const [mensaje, setMensaje] = useState('')

    // Formulario de datos
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        genre: '',
        country: '',
        email: '',
        password: ''
    });

    // Manejar el cambio en los datos del formulario
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const totalSteps = 2;

    const nextStep = () => {
        if (activarAlerta) {
            setActivarAlerta(false);
        }
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    //Función asincronica para registrarse
    async function realizarRegistro(_name, _surname, _country, _genre, _email, _password){
        //Registrar el usuario 
        const response = await registerUser(_name,_surname, _country, _genre, _email, _password )

        //Respuesta de alerta de exito de registro
        if(response.success){
            setActivarExito(prevState => !prevState)
            setMensaje('Cuenta creada con exito')
        }else{
            if (!activarAlerta) {
                setActivarAlerta(true);
                setMensaje('¡Error! No se registro el usuario')
            } else {
                setActivarAlerta((prevState) => !prevState);
            }
            console.error("No se logro crear la cuenta  ")
        }
    }


    // Función para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const esValido = Object.values(formData).every((value) => value.trim() !== "")

        if (!esValido) {
            console.error("El formulario no se envio")
            return
        }
        try {
            realizarRegistro(formData.name, formData.surname, formData.country, formData.genre,formData.email, formData.password)
        } catch (error) {
            console.error("Existe un error al registrar0", error)
        }

    };

    // Función para comprobar si los campos requeridos están completos
    const comprobarCompletado = () => {
        const { name, surname, genre, country } = formData;
        if (!name.trim() || !surname.trim() || !genre.trim() || !country.trim()) {
            if (!activarAlerta) {
                setActivarAlerta(true);
                setMensaje('¡Hay campos incompletos!')
            } else {
                setActivarAlerta((prevState) => !prevState);
            }
            return;
        }
        nextStep();
    };

    // Comprobar si todos los campos están completos
    const isFormComplete = () => {
        return Object.values(formData).every((value) => value.trim() !== "");
    };

    // Función para renderizar el contenido del paso actual
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <FirstStep formData={formData} handleChange={handleChange} />;
            case 2:
                return <SecondStep formData={formData} handleChange={handleChange} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Alertas */}
            {activarAlerta && <ErrorAlert text={mensaje}></ErrorAlert>}
            {activarExito && <SuccesAlert text={mensaje} redirectUrl={"/login"}></SuccesAlert>}

            {/* Activar alerta de exito */}
            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
                {/* Renderizar el contenido del Step */}
                {/* Progreso */}
                <div className="flex items-center mb-6">
                    {[...Array(totalSteps)].map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 h-2 rounded-full mx-1 ${index < currentStep ? 'bg-colorHover' : 'bg-gray-300'}`}
                        ></div>
                    ))}
                </div>

                <div className="">{renderStepContent()}</div>

                {/* Botones de Navegación */}
                <div className="flex justify-between items-center mt-6 w-full">


                    {/* Botón "Anterior" */}
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-6 py-2 text-sm font-medium rounded-md ${currentStep === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        &lt; Anterior
                    </button>

                    {/* Botón "Siguiente" o "Enviar" */}
                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={comprobarCompletado}
                            className="px-6 py-2 text-sm font-medium bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                        >
                            Siguiente &gt;
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!isFormComplete()}
                            className={`px-6 py-2 text-sm font-medium ${isFormComplete() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            Enviar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
