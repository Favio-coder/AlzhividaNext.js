import Image from "next/image";
import Header from "./components/Header";
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'


// export default async function Page() {
//   const cookieStore = await cookies()
//   const supabase = createClient(cookieStore)

//   const { data: todos } = await supabase.from('todos').select()

//   return (
//     <ul>
//       {todos?.map((todo) => (
//         <li>{todo}</li>
//       ))}
//     </ul>
//   )
// }


export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Hola Mundo!!</h1>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    
        </footer>
      </div>
    </div>
  );
}
