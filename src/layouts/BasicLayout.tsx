import { useEffect, useState, type JSX } from "react";
import { Outlet } from "react-router-dom";
import BasicHeader from "./BasicHeader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useCustomhook from "../hooks/useCustomhook";



export default function BasicLayout():JSX.Element{
    
    const { item: user,
        setItem: setUser
    } = useCustomhook();

    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsub();
    },[])

    if (loading) return <div>Loading</div>;

    return(
        <>
            
            <header>
                <BasicHeader user={user}/>
            </header>
            <main>
                <Outlet context={{ user }}/>
            </main>
        </>
    )
}