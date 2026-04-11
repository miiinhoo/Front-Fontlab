import { useEffect, useState } from "react";
import ButtonComponent from "../components/common/ButtonComponent";
import { FontMap } from "../arrays/FontArrays";
import { loadFontOnce } from "../utils/loadFontOnce";
import useGoogleFonts from "../hooks/useGoogleFonts";
import arrow from "../imgs/arrow.svg";
import useCustomhook from "../hooks/useCustomhook";

// 카테고리 필터
type Category = "serif" | "sans" | "display";

export default function MainPage(){

    const { API_KEY } = useGoogleFonts();
    const { bool, setBool, handleSelect } = useCustomhook();
    // serif/sans/display 필터
    const [ category , setCategory ] = useState<Category>("sans");
    const [ preview, setPreview ] = useState<Record<string, string>>({});
    const [ popularFonts, setPopularFonts ] = useState<string[]>([]);

    useEffect(() => {
        FontMap[category].forEach(font => loadFontOnce(font));
    },[category]);

    useEffect(() => {
        if (!API_KEY) return;
        fetch(
            `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=trending`
        ).then(d => d.json())
        .then(data => {
                // 상위 5개 폰트만 추출
                const topFonts = data.items.slice(0, 5).map((f: any) => f.family);
                setPopularFonts(topFonts);
                
                // 인기 폰트들도 브라우저에 로드
                topFonts.forEach((font: string) => loadFontOnce(font));
        })
        .catch(err => console.error("인기 폰트 로드 실패:", err));
    },[API_KEY]);

    return(
        <div className="page-inner">
            <div className="main-container">
            <h2>
                당신의 프로젝트를 위한 <span style={{ color : "#4361EE"}}>폰트 실험실, FontLab.</span>
            </h2>
            <p>
                <small>
                    다양한 폰트를 실시간으로 테스트하고 나만의 컬렉션을 찾아보세요.
                </small>
            </p>
            <div className="popular-fonts">
                <div className="search-container">
                    <span className="search-label">실시간 인기 폰트</span>
                    <div className="ticker-wrap" onClick={() => setBool(!bool)} style={{ cursor: "pointer" }}>
                        {popularFonts.length > 0 ? (
                            <ul className="ticker-list">
                                {/* 자연스러운 무한 롤링을 위해 첫 번째 요소를 복제해서 마지막에 추가 */}
                                {[...popularFonts, popularFonts[0]].map((font, idx) => (
                                    <li key={idx}>
                                        <span className="rank">{idx === 5 ? 1 : idx + 1}</span>
                                        <p className="font-name" 
                                        onClick={() => { handleSelect(font); }}
                                        style={{ fontFamily: `"${font}"` }}>{font}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="loading-text">로딩 중...</span>
                        )}
                        <span className={"down-arrow" + (bool ? " active" : "")}>
                            <img src={arrow} alt="드롭다운 이미지" className="drop-down-img"/>
                        </span>
                    </div>
                    <div className={"dropdown-container" + (bool ? " active" : "")}>
                        <ul className="dropdown-box">
                            {popularFonts.map((f, idx) => (
                                <li key={f} 
                                onClick={() => { handleSelect(f); }}
                                style={{ fontFamily: `"${f}"` }}>
                                    <span style={{ marginRight: "12px", fontWeight: "bold", opacity: 0.5 }}>{idx + 1}</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="font-category">
                    <ButtonComponent
                    event={() => {setCategory("serif"); setPreview({})}} text="Serif"
                    cln={"fontbtn" + (category === "serif" ? " active" : "")}
                    />
                    <ButtonComponent
                    event={() => {setCategory("sans"); setPreview({})}} text="Sans-serif"
                    cln={"fontbtn" + (category === "sans" ? " active" : "")}
                    />
                    <ButtonComponent
                    event={() => {setCategory("display"); setPreview({})}} text="Display"
                    cln={"fontbtn" + (category === "display" ? " active" : "")}
                    />
                </div>
            </div>
            
            <div className="font-main">
                {
                    FontMap[category].map(font => (
                        <div key={font} className="font-items" onClick={() => handleSelect(font)} style={{ cursor: "pointer" }}>
                            <h2 style={{ fontFamily: `"${font}", ${category === "sans" ? "sans-serif" : "serif"}` }}>
                                {font}
                            </h2>
                            <input type="text" 
                            value={preview[font] || ""}
                            style={{ fontFamily: `"${font}"${category === "sans" ? ", sans-serif" : ""}` }}
                            placeholder="여기에 텍스트를 입력해보세요.."
                            onClick={(e) => e.stopPropagation()}
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
        </div>
    )
}
