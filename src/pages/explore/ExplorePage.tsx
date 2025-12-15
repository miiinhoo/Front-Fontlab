import { lazy, Suspense, useState, type JSX } from "react";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import FontCard from "../../components/FontCard";
import useCustomhook from "../../hooks/useCustomhook";
import { createFont } from "../../api/fontsService";
import FontCardSkeleton from "../../components/skeleton/FontCardSkeleton";

export default function ExplorePage(): JSX.Element {
  // 훅으로 필터된 폰트 가져오기
  const { fonts, search, setSearch, category, setCategory,loading } = useGoogleFonts();
  const { navigate,handleChange, tempA } = useCustomhook();
  // 페이지 상태
  const [page, setPage] = useState<number>(1);

  const PER_PAGE = 50;

  // 총 페이지 수
  const totalPages = Math.ceil(fonts.length / PER_PAGE);

  // 9페이지씩 묶는 그룹 크기
  const groupSize = 9;

  // 현재 페이지가 속한 그룹
  const currentGroup = Math.ceil(page / groupSize);

  // 시작페이지
  const startPage = (currentGroup - 1) * groupSize + 1;

  // 마지막 페이지
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  // 보여줄 페이지 배열 생성
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 폰트 목록 자르기
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const pageFonts = fonts.slice(start, end);

  const handleSelect = async (font: any) => {
  const res = await createFont({
    family: font.family,
    text: "",
    size: 32,
    weight: 400,
    style: "normal",
    spacing: 0,
    height: 1.5,
    createdAt: Date.now(),
  });

  // 저장 성공 → settings로 이동
  navigate(`/playground/settings/${res.id}`);
  };

  
  return (
    <div className="page-inner list">
      {/* 상단 검색 + 카테고리 */}
      <div className="top-box">
        <p className="left-box">
          <input type="text" 
          onChange={(e) => handleChange(e)}
          value={tempA}
          placeholder="글자를 입력해보세요.."
          />
        </p>

        <p className="right-box">
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
        </p>
        
      </div>

      <div className="font-grid">
        {
          // 로딩 중 표시용 Skeleton 카드
          loading
          ? Array.from({length : PER_PAGE}).map((_,i) => (
            <FontCardSkeleton key={i}/>
          ))
          :
          // 로딩 완료 후 보여주는 폰트 카드 
          pageFonts.map((font) => (
            <FontCard key={font.family} font={font} tempA={tempA} click={()=>handleSelect(font)}/>
          ))
        }
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">

        {/* 이전 그룹 이동 버튼 */}
        {currentGroup > 1 && (
          <button 
          onClick={() => setPage(startPage - groupSize)}
          className="arrow"
          >
            &lt;
          </button>
        )}

        {/* 9개 페이지 버튼 */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={"pagination"+(page === num ? " active" : "")}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}

        {/* 다음 그룹 이동 버튼 */}
        {endPage < totalPages && (
          <button onClick={() => setPage(endPage + 1)}
          className="arrow">
            &gt;
          </button>
        )}

      </div>
    </div>
  );
}
