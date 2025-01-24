import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Alert from "../ui/Alert";
import axios from "axios";

export default function SecondStep({ formData = {}, handleChange }) {
    // Inicializa estados
    const [email, setEmail] = useState(formData.email || '')
    const [password, setPassword] = useState(formData.password || '')
    const [passwordAgain, setPasswordAgain] = useState(formData.passwordAgain || '')
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordAgain, setShowPasswordAgain] = useState(false)

    // Variables de validación
    const [emailValid, setEmailValid] = useState(true)
    // Existencia del Email 
    const [emailExist, setEmailExist] = useState(false)

    const [passwordValid, setPasswordValid] = useState(true)
    const [passwordMatch, setPasswordMatch] = useState(true)

    // Validar email
    const validarEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    //Comprobar existencia del email 
    const comprobarEmail = async (email) => {
        try {
            const response = await axios.get("api/register/comprobarEmail", { params: { email } })
            setEmailExist(response.data.existe)
        } catch (e) {
            console.error("Error: ", e)
        }
    }

    // Validar contraseñas
    const validatePasswords = () => {
        setPasswordMatch(password === passwordAgain);  // Verifica si las contraseñas coinciden
        setPasswordValid(password.length >= 6);  // Verifica si la contraseña tiene al menos 6 caracteres
    }

    const mostrarContraseña = (e) => {
        switch (e) {
            case 1:
                setShowPassword(prevState => !prevState)
                break;
            case 2:
                setShowPasswordAgain(prevState => !prevState)
                break;
            default:
                break;
        }
    }

    // Manejar eventos en vivo
    const handleEmailBlur = () => {
        setEmailValid(validarEmail(email)) // Valida si el email es correcto
        if (validarEmail(email)) {
            comprobarEmail(email) // Solo si el email es válido, verifica su existencia
        }
    }

    const handlePasswordBlur = () => {
        validatePasswords();  // Valida las contraseñas
    }

    // Función para manejar cambios y actualizar formData
    const handleInputChange = (name, value) => {
        handleChange(name, value); // Actualiza el formData global
        if (name === "email") {
            setEmail(value);  // Actualiza el estado local
        } else if (name === "password") {
            setPassword(value);  // Actualiza el estado local
        } else if (name === "passwordAgain") {
            setPasswordAgain(value);  // Actualiza el estado local
        }
    }

    return (
        <div>
            <div className="flex container  items-center flex-col">
                <div className="text-colorHover items-center">
                    <div className="text-center pb-3">
                        <p className="text-2xl sm:text-3xl lg:text-[3rem]">Paso 2: Credenciales</p>
                    </div>
                </div>

                <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center bg-slate-100 rounded-md pt-12 shadow-xl">
                    <div className="mb-6">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full py-4 px-16 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => handleInputChange("email", e.target.value)}  // Llama a handleInputChange
                            onBlur={handleEmailBlur}  // Valida el email al salir del campo
                        />
                        {!emailValid && (
                            <Alert
                                isMessageAlert={true}
                                typeProp="advertencia"
                                messageAlert="Correo electrónico no válido"
                            />
                        )}
                        {emailExist && (
                            <Alert
                                isMessageAlert={true}
                                typeProp="peligro"
                                messageAlert="El correo ya está registrado. Usa otro."
                            />
                        )}
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center relative z-50">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className="w-full py-4 px-16 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => handleInputChange("password", e.target.value)}  // Llama a handleInputChange
                                onBlur={handlePasswordBlur}  // Valida la contraseña al salir del campo
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={() => mostrarContraseña(1)}
                            >
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                        {!passwordValid && (
                            <>
                                {password == null && (
                                    <Alert
                                        isMessageAlert={true}
                                        typeProp="peligro"
                                        messageAlert="Escribe una contraseña"
                                    />
                                )}
                                {password != null && (
                                    <Alert
                                        isMessageAlert={true}
                                        typeProp="peligro"
                                        messageAlert="La contraseña no es segura"
                                    />
                                )}
                            </>
                        )}

                    </div>

                    <div className="mb-6">
                        <div className="flex items-center relative z-50">
                            <input
                                type={showPasswordAgain ? 'text' : 'password'}
                                name="passwordAgain"
                                id="passwordAgain"
                                className="w-full py-4 px-16 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                                placeholder="Repetir contraseña"
                                value={passwordAgain}
                                onChange={(e) => handleInputChange("passwordAgain", e.target.value)}  // Llama a handleInputChange
                                onBlur={handlePasswordBlur}  // Valida la repetición de la contraseña al salir del campo
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={() => mostrarContraseña(2)}
                            >
                                {showPasswordAgain ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                        {!passwordMatch && (
                            <Alert
                                isMessageAlert={true}
                                typeProp="advertencia"
                                messageAlert="Contraseña no coincide"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
