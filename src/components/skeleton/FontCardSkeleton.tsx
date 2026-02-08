import type { JSX } from "react";

export default function FontCardSkeleton():JSX.Element{
    return(
        <div className="font-cardwrap">
            <div className={"font-card"} 
            style={{ background : "lightgray", opacity: 0.8}}
            >
            </div>
        </div>
    )
}