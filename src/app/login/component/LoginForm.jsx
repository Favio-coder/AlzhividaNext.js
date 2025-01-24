'use client'

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Alert from "./ui/Alert";
import loginUser from "../services/loginController";
import ErrorAlert from "./ui/alerts/ErrorAlert";
import SuccesAlert from "./ui/alerts/SuccesAlert";

export default function LoginForm() {
    //Inicializa en vacio
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Inicializa en falso
    const [showPassword, setShowPassword] = useState(false)

    //Cambio de estados de componentes 
    const [isAlertVisibleEmail, setIsAlertVisibleEmail] = useState(false)
    const [isAlertVisiblePassword, setIsAlertVisiblePassword] = useState(false)

    //Cambio de Sweet Alert 
    const [isErrorAlert, setIsErrorAlert] = useState(false)
    const [isSuccesAlert, setIsSuccesAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState('')
    

    //Crear formulario para enviar 
    const loginUsuario = async (_email, _password) => {
        try {
            const response = await loginUser(_email, _password)
            return response
        } catch (error) {
            console.error(error, '500')
            return {succes: false, message: "Error del servidor"}
        }
        

    }

    const enviarFormulario = (e) => {

        e.preventDefault()

        let decisionCorreo = true;
        let decisionContraseña = true;

        if (email === '') {
            decisionCorreo = false;
            if (!isAlertVisibleEmail) {
                setIsAlertVisibleEmail(true);
            }
        } else {
            if (isAlertVisibleEmail) {
                setIsAlertVisibleEmail(false);
            }
        }

        if (password === '') {
            decisionContraseña = false;
            if (!isAlertVisiblePassword) {
                setIsAlertVisiblePassword(true);
            }
        } else {
            if (isAlertVisiblePassword) {
                setIsAlertVisiblePassword(false);
            }
        }

        if (decisionCorreo && decisionContraseña) {
            loginUsuario(email, password).then((response) => {
                if (response.succes) { 
                    setIsSuccesAlert(true)
                    setMessageAlert("Se inicio correctamente la sesión")
                } else {
                    setIsErrorAlert(true)
                    setMessageAlert("¡Error! No se logro iniciar sesión")
                }
            }).catch((error) => {
                setMessageAlert('¡Error! Error de servidor')
                setIsErrorAlert(true)
                console.error(error, '500')
            })
        }
    }


    const mostrarContraseña = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <div className="mx-auto my-auto w-screen h-screen items-center flex-col overflow-y-auto overflow-x-hidden lg:overflow-hidden">
            <header>
                <div className="text-colorHover flex items-center justify-between w-full px-4 my-6 sm:px-8">
                    <Link href="/" className="w-35 text-colorHover">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6  currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                    </Link>
                    <a href="">
                        <p className="text-2xl">Alzhivida</p>
                    </a>
                    <span className="w-35"></span>
                </div>
            </header>
            {/* Alertas */}
            { isSuccesAlert && <SuccesAlert text={messageAlert} redirectUrl='/home' />}
            { isErrorAlert && <ErrorAlert text={messageAlert} reload={true} />}
            <div>
                <div className="flex container mx-auto my-auto w-screen h-screen items-center flex-col">
                    <div className="text-colorHover items-center">
                        <div className="text-center pb-3">
                            <p className="text-[3rem]">!Bienvenido!</p>
                        </div>
                    </div>

                    <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center bg-slate-100 rounded-md pt-12 shadow-xl">
                        <form onSubmit={enviarFormulario} className="w-3/4">
                            <div className="mb-6">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Alert
                                    isMessageAlert={isAlertVisibleEmail}
                                    typeProp="advertencia"
                                    messageAlert="Debes rellenar este campo"
                                />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center relative z-50">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                        onClick={mostrarContraseña}
                                    >
                                        {showPassword && <FontAwesomeIcon icon={faEyeSlash} />}
                                        {!showPassword && <FontAwesomeIcon icon={faEye} />}
                                    </span>
                                </div>
                                <Alert
                                    isMessageAlert={isAlertVisiblePassword}
                                    typeProp="advertencia"
                                    messageAlert="Debes rellenar este campo"
                                />
                            </div>

                            <div className="mb-12">
                                <button type="submit" className="py-4 bg-colorHover w-full rounded text-blue-50 font-bold hover:shadow-md">Ingresar</button>

                                <p className="text-center">o continua con</p>
                                <button className="py-4 bg-white w-full rounded text-black shadow-md hover:shadow-2xl">
                                    <div className="flex items-center justify-center space-x-2 gap-4">
                                        Ingresar con Google
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-center container mx-auto mt-6 text-colorHover text-sm">
                        <div className="flex flex-col sm:flex-row justify-between md:w-1/2 items-center">
                            <Link href="">
                                <div className="flex hover:underline">¿Olvidaste la contraseña?</div>
                            </Link>

                            <Link href="/register">
                                <div className="flex gap-1">
                                    <span className="text-black"> ¿No tienes una cuenta?  </span>
                                    <p className="hover:underline">Create una</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
