import { supabase } from "@/app/lib/supabase/supabase";

const loginUser = async (email, password) =>{
    const {data, error} = await supabase.auth.signInWithPassword({
        email,password
    })

    if(error){
        return {succes: false, message: error.message}
    }

    console.log("Usuario autenticado")
    return {succes: true, message:"Usuario autenticado", user: data.user}
}

export default loginUser