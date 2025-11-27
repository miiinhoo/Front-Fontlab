import { useEffect, useState, type JSX } from "react";
import useGoogleFonts from "../hooks/useGoogleFonts";
import FontCard from "../components/FontCard";

export default function ExplorePage(): JSX.Element {
  // 훅으로 필터된 폰트 가져오기
  const { fonts, search, setSearch, category, setCategory } = useGoogleFonts();

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

  return (
    <>
      {/* 상단 검색 + 카테고리 */}
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

      {/* 폰트 카드 그리드 */}
      <div className="font-grid">
        {pageFonts.map((font) => (
          <FontCard key={font.family} font={font} />
        ))}
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
    </>
  );
}
