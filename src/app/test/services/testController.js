import { supabase } from "@/app/lib/supabase/supabase";

//Realizar la consulta
export async function testController() {
    try {
        const { data, error } = await supabase.from("prueba").select("*")
        if (error) {
            console.error("Error al intentar extraer datos:", error)
            return { data: [], error }
        }
        console.log("Datos obtenidos de Supabase:", data) // Verifica la respuesta de la consulta
        return data
    } catch (error) {
        console.error("Error inesperado:", error)
        return { data: [], error }
    }
}


