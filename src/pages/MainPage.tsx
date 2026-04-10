import { useEffect, useState } from "react";
import Search from "../imgs/search.svg";
import ButtonComponent from "../components/common/ButtonComponent";
import { FontMap } from "../arrays/FontArrays";
import { loadFontOnce } from "../utils/loadFontOnce";

// 카테고리 필터
type Category = "serif" | "sans" | "display";

export default function MainPage(){

    const [ category , setCategory ] = useState<Category>("sans");
    const [ preview, setPreview ] = useState<Record<string, string>>({});

    useEffect(() => {
        FontMap[category].forEach(font => loadFontOnce(font));
    },[category]);

    return(
        <div className="page-inner">
            <h2>
                당신의 웹 프로젝트를 위한 <span style={{ color : "#4361EE"}}>폰트 실험실, FontLab.</span>
            </h2>
            <p>
                <small>
                    다양한 폰트를 실시간으로 테스트하고 나만의 컬렉션을 찾아보세요.
                </small>
            </p>
            <div className="search-toolbar">
                <p className="search-container">
                    <span>
                        <img src={Search} alt="" />
                    </span>
                    <input type="text" 
                    placeholder="폰트 이름을 입력하세요.."
                    title="search"
                    />
                </p>

                <div className="font-category">
                    <ButtonComponent
                    event={() => {setCategory("serif"); setPreview({})}} text="Serif"/>
                    <ButtonComponent
                    event={() => {setCategory("sans"); setPreview({})}} text="Sans-serif"/>
                    <ButtonComponent
                    event={() => {setCategory("display"); setPreview({})}} text="Display"/>
                </div>
            </div>
            
            <div className="font-main">
                {
                    FontMap[category].map(font => (
                        <div key={font}>
                            <h2 style={{ fontFamily: `"${font}", ${category === "sans" ? "sans-serif" : "serif"}` }}>
                                {preview[font] || font}
                            </h2>
                            <input type="text" 
                            value={preview[font] || ""}
                            onChange={(e) => {
                                setPreview(prev => ({
                                    ...prev,
                                    [font]: e.target.value
                                }))
                            }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}