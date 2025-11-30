import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFont, updateFont } from "../api/fontsService";

export default function useCustomhook(){
    const navigate = useNavigate();
    const { id } = useParams();
    // 불타입
    const [ bool, setBool ] = useState<boolean>(false);
    // 문자열타입
    const [ temp, setTemp ] = useState<string>("");

    // 모든타입
    const [ item, setItem ] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | 
      HTMLSelectElement 
      | HTMLTextAreaElement
      >):void => {
      setTemp(e.target.value);
    }

    const handleSave = async() => {
      await updateFont(id!, item);
      navigate("/playground");
    }
    const handleDelete = async() => {
      await deleteFont(id!);
      navigate("/playground");
    }

    return{
      // 페이지 이동
      navigate,

      // id
      id,

      // 현재 수정 중인 문서
      item,
      setItem,

      // 부가 상태
      temp,
      bool,
      setBool,

      // 이벤트 핸들러
      handleChange,
      handleSave,
      handleDelete,
    }
}