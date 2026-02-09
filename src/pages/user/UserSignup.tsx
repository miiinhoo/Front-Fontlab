import type { JSX } from "react";
import { UserArray } from "../../arrays/UserArrays";
import useCustomhook from "../../hooks/useCustomhook";
import ButtonComponent from "../../components/common/ButtonComponent";

export default function UserSignup():JSX.Element{
<<<<<<< HEAD
    const { navigate, userData, handleSignup, handleUserChange } = useCustomhook();
=======
    const { userData, handleSignup, handleUserChange } = useCustomhook();
>>>>>>> second
    return(
        <section>
            <div className="page-inner">
                <form>
                    {UserArray.map((form:any) => (
                        <label>
                            <input 
                            name={form.name}
                            type={form.type || "text"} 
                            placeholder={form.name}
                            value={userData[form.name as keyof typeof userData]}
                            onChange={handleUserChange}
                            />
                        </label>
                    ))}
                    <ButtonComponent
                    text="회원가입"
                    event={handleSignup}
                    />
                </form>
            </div>
        </section>
    )
}