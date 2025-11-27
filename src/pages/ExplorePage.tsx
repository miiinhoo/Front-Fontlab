import { type JSX } from "react";
import useGoogleFonts from "../hooks/useGoogleFonts";

export default function ExplorePage():JSX.Element{

    const { fonts, search, setSearch, category, setCategory } =
    useGoogleFonts();
    return(
        <>
            <div className="top-box">
                <input
                placeholder="폰트 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="all">전체</option>
            <option value="sans-serif">고딕체</option>
            <option value="serif">명조체</option>
            <option value="display">디스플레이</option>
            <option value="handwriting">손글씨</option>
            <option value="monospace">고정폭</option>
            </select>

            </div>
            <div>
            {fonts.map((f) => (
            <div key={f.family}>{f.family}</div>
            ))}
            </div>
        </>
    )
}