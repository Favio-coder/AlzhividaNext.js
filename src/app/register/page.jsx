'use client'

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import StepForm from "./component/StepForm";
//Importar componente de Error

export default function registerPage() {
    //Inicializa en vacio
    const [showPassword, setShowPassword] = useState(false);

    //Función para enviar datos
    const enviarFormulario = (e) => {
        e.preventDefault();
    };

    const mostrarContraseña = (e) => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="mx-auto my-auto overflow-y-auto overflow-x-hidden lg:overflow-hidden min-h-screen">
            <header>
                <div className="text-colorHover flex items-center justify-between w-full px-4 my-6 sm:px-8">
                    <Link href="/" className="w-35 text-colorHover">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                    </Link>
                    <a href="">
                        <p className="text-2xl">Alzhivida</p>
                    </a>
                    <span className="w-35"></span>
                </div>
            </header>

            <div className="px-5"> 
                <main>
                    <StepForm></StepForm>
                </main>
                
                {/* Línea de separación */}
                <div className="border-t border-gray-300 my-6"></div>

                {/* Botón y opciones de inicio de sesión */}
                <div className="mb-12">
                    <p className="text-center my-4">o continua con</p>
                    <button type="submit" className="py-4 bg-white  w-full rounded text-black shadow-md hover:shadow-2xl">
                        <div className="flex items-center justify-center space-x-2 gap-4">
                            Registrarse con Google
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
