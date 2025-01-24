'use cliente'

import React from "react"
import { useState } from "react"


/**De por sí, cuando presionas la pantalla, el componente mensaje desaparece */
export default function ModalSucces({messageModal,messageTitle, showButton}){
    /**
     * messageModal : mensaje del modal 
     * messaTitle: titulo del mensaje
     * showButton: Si quieres mostrar botones (true o false)
     */

    <div>
        {/**<!-- Button trigger modal -->**/}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        {/**<!-- Modal -->**/}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{messageTitle}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {/**Mensaje de alerta */}
                    {messageModal}
                </div>

                <div className="modal-footer" style={{display: showButton ? 'block' : 'none'}}>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Continuar</button>
                </div>
            </div>
        </div>
        </div>
    </div>
}