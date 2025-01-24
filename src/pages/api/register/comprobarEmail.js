import { supabase } from "@/app/lib/supabase/supabase"

export default async function comprobarEmail(req, res){
    if(req.method === 'GET'){
        const {email} = req.query

        if(!email){
            return res.status(400).json({error: "Email es requerido"})
        }

        try{
            const {data, error} = await supabase.from('usuarios').select('l_correoElectronico').eq('l_correoElectronico', email).single()
            if(error && error.code !== 'PGRST116'){
                throw error
            }

            const existe = Boolean(data)
            //Retornamos el correo repetido 
            return res.status(200).json({existe})
        } catch(e){
            console.error("Error: ", e)
            return res.status(500).json({error: "La tabla usuarios no existe"})
        }
    }else{
        return res.status(405).json({error:"Requiere permisos"})
    }
} 