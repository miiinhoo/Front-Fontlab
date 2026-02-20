
import './Button.scss';

type Props = {
    text: string,
    cln?: string,
    types?: "button" | "submit" | "reset",
    event?: () => void,
    styles?: React.CSSProperties,
    disable?: boolean,
}

export default function ButtonComponent({text,cln,types,event,styles,disable}:Props){
    return(
        <>
            <button
            className={cln}
            onClick={event}
            style={styles || {cursor: "pointer" }}
            disabled={disable}
            type={types || "button"}
            >
                {text}
            </button>
        </>
    )
}