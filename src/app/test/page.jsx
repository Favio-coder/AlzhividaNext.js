'use client'

import { useState, useEffect } from "react"
import React from "react"
import { testController } from "./services/testController"
import { registerUser } from "../register/services/registerController"

export default function Test() {
  // Datos de formulario
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [registroStatus, setRegistroStatus] = useState(null)  // Para guardar el estado del registro
  const [loading, setLoading] = useState(false)  // Para manejar el estado de carga

  // Función para comprobar si el email ya está registrado
  async function comprobarEmail(email) {
    const response = await fetch(`/api/register/comprobarEmail?email=${email}`)
    const data = await response.json()
    return data.isEmailTaken // Asumimos que la respuesta tiene un campo 'isEmailTaken'
  }

  // Función de registro
  async function handleRegister(password, email) {
    const nombre = "Favio";
    const apellido = "Asturimac";
    const genero = "Masculino";
    const pais = "Perú";

    setLoading(true)  // Activar el estado de carga

    const emailTaken = await comprobarEmail(email)
    if (emailTaken) {
      setLoading(false)
      setRegistroStatus('Este correo electrónico ya está registrado.')  // Mostrar mensaje de error
      return
    }

    // Si el email no está registrado, continuar con el registro
    const response = await registerUser(nombre, apellido, pais, genero, email, password)

    setLoading(false)  // Desactivar el estado de carga

    if (response.success) {
      setRegistroStatus('Usuario creado con éxito')  // Mostrar mensaje de éxito
    } else {
      setRegistroStatus('Error en el registro: ' + response.message)  // Mostrar mensaje de error
    }
  }

  // Función para manejar el envío del formulario
  const enviarFormulario = (e) => {
    e.preventDefault()
    const datosRegistro = {
      "Gmail": email,
      "Contraseña": password
    }

    console.log("El usuario es: ", datosRegistro)
    try {
      handleRegister(password, email)
    } catch (error) {
      console.error("Hubo un error al crear la cuenta")
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Test de registro de usuario</h1>
      <h2>Registro de Usuario:</h2>
      <form onSubmit={enviarFormulario}>
        <label>Correo electrónico: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          placeholder="Correo electrónico"
          className="border border-gray-300"
          required
        />
        <br />
        <br />
        <label>Contraseña: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder="Contraseña"
          className="border border-gray-300"
        />
        <br />
        <br />
        <button className="bg-gray-300 px-4 py-2" type="submit">
          Registrarse
        </button>
      </form>
      <br />
      <br />

      <button className="bg-gray-300 px-4 py-2" onClick={handleRegister} disabled={loading}>
        {loading ? 'Cargando...' : 'Registrar con google'}
      </button>

      {registroStatus && (
        <div>
          {registroStatus.includes('Error') ? (
            <p style={{ color: 'red' }}>{registroStatus}</p>  // Mensaje de error
          ) : (
            <p style={{ color: 'green' }}>{registroStatus}</p>  // Mensaje de éxito
          )}
        </div>
      )}
    </div>
  )
}
