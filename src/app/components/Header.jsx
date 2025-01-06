'use client'

import { useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

//Diccionario para los URL 
const navegacionUrl = [
    {
        name: 'item1',
        href: '#'
    },
    {
        name: "item2",
        href: "#"
    },
    {
        name: "item3",
        href: "#"
    }
]


export default function Header() {
    //Estado para móvil 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <header className="bg-white absolute inset-x-0 top-1 z-50  shadow-xl">
                <nav
                    aria-label="Global"
                    className="flex items-center justify-between p-6 lg:px-8"
                >
                    {/* Logo y Nombre */}
                    <div className="flex lg:flex-1">
                        <Link href="#" className="-m-1.5 p-1.5 flex items-center">
                            <span className="sr-only">Empresa Alzhivida</span>
                            <img
                                alt="Logo de Alzhivida"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                            <p className="ml-2 font-semibold text-gray-900">Alzhivida</p>
                        </Link>
                    </div>

                    {/* Botón de Menú Mobile */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    {/* Navegación Desktop */}
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navegacionUrl.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                /**Usando Tailwind.config.mjs */
                                className="text-sm/6 font-semibold text-gray-900 hover:text-colorHover"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Botón de Iniciar Sesión */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link
                            /**Sin usar Tailwind.config.mjs */
                            href="/login"
                            className="text-sm/6 font-semibold text-gray-900 hover:style"
                            onMouseEnter={(e) => e.target.style.color = '#5f17bf'}
                            onMouseLeave={(e) => e.target.style.color = ''}
                        >
                            Iniciar sesión <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>

                {/* Menú Mobile */}
                <Dialog
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                    className="lg:hidden"
                >
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            {/* Logo en Menú Mobile */}
                            <Link href="#" className="-m-1.5 p-1.5 flex items-center">
                                <span className="sr-only">Empresa Alzhivida</span>
                                <img
                                    alt="Logo de Alzhivida"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                                <p className="ml-2 font-semibold text-gray-900">Alzhivida</p>
                            </Link>
                            {/* Botón de Cerrar Menú */}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Cerrar menú</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Links del Menú */}
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navegacionUrl.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </div>


    )

}