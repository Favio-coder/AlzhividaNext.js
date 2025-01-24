import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const createClient = (cookiestore) => {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
              } catch {
                // Ignorar si setAll fue llamado desde un componente de servidor.
              }
            },
          },
        }
      )
}