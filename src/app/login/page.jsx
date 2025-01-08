import LoginForm from "./component/LoginForm"

export default function loginPage() {
    return (
        //Cuando no se puede hacer Scrool, es que la pantalla no esta ocupando por completo 
        //Usar w-scree y h-screen
        <div className="bg-color-gray w-screen h-screen overflow-hidden lg:overflow-hidden lg:h-auto">
            <LoginForm />
        </div>


    )
}