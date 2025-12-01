import type { JSX } from "react";
import { Outlet } from "react-router-dom";

export default function PlaygroundPage():JSX.Element{
    return(
        <section>
            PlaygroundPage
            <Outlet/>
        </section>
    )
}