import type { JSX, ReactNode } from "react";

type Props = {
    children : ReactNode,
    event? : (e: React.ChangeEvent<HTMLSelectElement>) => void,
    values? :  string | number,
}
export default function SelectComponent({children,event,values}:Props):JSX.Element{
    return(
        <>
            <select
            onChange={event}
            value={values}
            >
                {children}
            </select>
        </>
    )
}