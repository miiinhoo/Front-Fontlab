import { useEffect, type JSX } from "react";
import { Outlet } from "react-router-dom";
import BasicHeader from "./BasicHeader";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useCustomhook from "../hooks/useCustomhook";


export default function BasicLayout():JSX.Element{
    const { item: user, setItem: setUser } = useCustomhook();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    return () => unsubscribe();
    }, []);

    return(
        <>
            <header>
                <BasicHeader user={user}/>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}