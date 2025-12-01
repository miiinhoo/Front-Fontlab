import type { JSX } from "react";

type Props = {
    text: string,
    cln?: string,
    types?: "button" | "submit" | "reset",
    event?: () => void,
}

export default function ButtonComponent({text,cln,types,event}:Props):JSX.Element{
    return(
        <>
            <button
            className={cln}
            onClick={event}
            type={types || "button"}
            >
                {text}
            </button>
        </>
    )
}