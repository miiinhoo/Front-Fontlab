import type { JSX } from "react";
import { UserArray } from "../../arrays/UserArrays";
import useCustomhook from "../../hooks/useCustomhook";
import ButtonComponent from "../../components/common/ButtonComponent";

export default function UserLogin():JSX.Element{
    const { navigate,userData, handleUserChange, handleLogin } = useCustomhook();
    return(
        <section>
            <div className="page-inner">
                <form>
                    {
                    UserArray.slice(1,3).map((x,inx) => (
                        <label key={inx}>
                            <input
                            name={x.name}
                            type={x.type || "text"}
                            placeholder={x.name}
                            value={userData[x.name as keyof typeof userData]}
                            onChange={handleUserChange}
                            />
                        </label>
                    ))
                    }
                    <div className="button-content">
                        <ButtonComponent 
                        text="로그인"
                        event={handleLogin}
                        />
                        <ButtonComponent
                        text="회원가입"
                        event={() => navigate("/user/signup")}
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}