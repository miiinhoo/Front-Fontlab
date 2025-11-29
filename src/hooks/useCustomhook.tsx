import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCustomhook(){
    const navigate = useNavigate();
    const [ bool, setBool ] = useState<boolean>(false);
    const [ temp, setTemp ] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | 
      HTMLSelectElement 
      | HTMLTextAreaElement
      >):void => {
      setTemp(e.target.value);
    }
    return{
        navigate,
        temp,
        bool,
        setBool,
        handleChange
    }
}