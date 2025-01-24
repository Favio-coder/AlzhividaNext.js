'use client'

//Step de datos personales
import React from "react"
import Flag from 'react-world-flags'
import { useState } from "react"

//Paises 
const paises = [
    { code: "AR", name: "Argentina" },
    { code: "BO", name: "Bolivia" },
    { code: "US", name: "Estados Unidos" },
    { code: "CL", name: "Chile" },
    { code: "CO", name: "Colombia" },
    { code: "CU", name: "Cuba" },
    { code: "EC", name: "Ecuador" },
    { code: "MX", name: "México" },
    { code: "PE", name: "Perú" },
    { code: "OT", name: "Otros" },
]

export default function FirstStep({ formData = {}, handleChange }) {

    //Declaración de estados
    const [paisSeleccionado, setPaisSeleccionado] = useState("")

    //Declaración de métodos 
    const cambiarBanderaPais = (e) => {
        const pais = e.target.value
        setPaisSeleccionado(pais)
    }

    const codigoPais = paises.find((pais) => pais.name === paisSeleccionado)?.code

    return (
        <div>
            <div className="flex container items-center flex-col">
                <div className="text-colorHover items-center">
                    <div className="text-center pb-3">
                        <p className="text-2xl sm:text-3xl lg:text-[3rem]">Paso 1:Información personal</p>
                    </div>
                </div>

                <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center bg-slate-100 rounded-md pt-12 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full px-6">
                        {/* Nombre */}
                        <div className="mb-6">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                                placeholder="Nombre(s)"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        {/* Apellidos */}
                        <div className="mb-6">
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                                placeholder="Apellidos"
                                value={formData.surname}
                                onChange={(e) => handleChange('surname', e.target.value)}
                            />
                        </div>

                        {/* Género */}
                        <div className="mb-6">
                            <select
                                name="genre"
                                id="genre"
                                className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300 text-gray-700"
                                value={formData.genre || ''} 
                                onChange={(e) => handleChange('genre', e.target.value)}
                            >
                                <option value="" disabled>Género</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="otros">Otro género</option>
                                <option value="prefieroNoDecirlo">Prefiero no decirlo</option>
                            </select>
                        </div>

                        {/* País */}
                        <div className="mb-6">
                            <div className="flex items-center relative z-50">
                                <select
                                    name="country"
                                    id="country"
                                    className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300 text-gray-700"
                                    value={formData.country || paisSeleccionado}
                                    onChange={(e) => {
                                        handleChange('country', e.target.value);
                                        cambiarBanderaPais(e);
                                    }}
                                >
                                    <option value="" disabled>
                                        País
                                    </option>
                                    {paises.map((pais) => (
                                        <option key={pais.code} value={pais.name}>
                                            {pais.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Mostrar la bandera solo si hay un país seleccionado */}
                                {codigoPais && (
                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                                        <Flag code={codigoPais} style={{ width: "24px", height: "16px" }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}