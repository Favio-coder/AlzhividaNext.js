'use client'
import { create } from "zustand";

const userStore = create((set) => {
    contador: 0
    increase: () => set((state)=>({contador: state.contador + 1}))
})

export default userStore