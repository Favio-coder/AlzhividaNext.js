import { supabase } from "@/app/lib/supabase/supabase";

//Función para registrar usuario 
export async function registerUser(name, surname, country, genre, email, password) {
    // Crear usuario en Supabase
    const {data: authData, error: authError} = await supabase.auth.signUp({
        email,
        password
    });

    if(authError) {
        return {success: false, message: authError.message};
    }

    const user = authData.user;

    if(!user) {
        return {success: false, message: "Usuario no registrado"};
    }


    // Rellenar información del usuario en la tabla 'usuarios'
    const {data: insertData, error: insertError} = await supabase.from("usuarios").insert([
        {
            i_idUsuario: user.id,
            l_nombre: name,
            l_apellido: surname,
            l_genero: genre,
            l_pais: country,
            l_correoElectronico: email
        }
    ]);

    if(insertError) {
        return {success: false, message: insertError.message};
    }

    return {
        success: true,
        message: "Usuario registrado exitosamente",
        dataAuth: user,
        data: insertData
    };
}


