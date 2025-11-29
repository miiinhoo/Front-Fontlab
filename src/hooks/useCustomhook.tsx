import { useState } from "react";

export default function useCustomhook(){
    const [ temp, setTemp ] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | 
      HTMLSelectElement 
      | HTMLTextAreaElement
      >):void => {
      setTemp(e.target.value);
    }
    return{
        temp,
        handleChange
    }
}