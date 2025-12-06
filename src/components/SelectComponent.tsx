import type { JSX, ReactNode } from "react";

type Props = {
    /** option 태그 */
    children : ReactNode,
    /** onChange 이벤트 */
    event? : (e: React.ChangeEvent<HTMLSelectElement>) => void,
    /** 들어올 값 */
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