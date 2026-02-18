// 주소창에 /playground를 넣으면 비로그인상태에서도 바로 들어가지니, 라우트가드를 생성함.

import { Navigate, useOutletContext } from "react-router-dom";
import useCustomhook from "../../hooks/useCustomhook";

export default function RouterGuard({children}:any){
    const { user } = useOutletContext<any>(); 
    const { loc } = useCustomhook();

    if (!user) {
        return (
            <Navigate
            to="/user/login"
            replace
            state={{ from: loc }}
            />
        );
    }

    return children;

}