import type { User } from "firebase/auth";
import { create } from "zustand";

interface Auth {
    user: User | null,
    setUser: (user: User | null) => void,
}

export const AuthStore = create<Auth>((set) => ({
    user: null,
    setUser: (user) => set({user})
}));