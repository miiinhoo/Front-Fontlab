import useGoogleFonts from "../../hooks/useGoogleFonts";
import FontCard from "../../components/FontCard";
import useCustomhook from "../../hooks/useCustomhook";
import FontCardSkeleton from "../../components/skeleton/FontCardSkeleton";
import SelectComponent from "../../components/SelectComponent";
import { FONT_FILTER_OPTIONS } from "../../arrays/FilterArrays";
import usePagination from "../../hooks/usePagination";

export default function ExplorePage() {
  // 훅으로 필터된 폰트 가져오기
  const { fonts, search, setSearch, category, setCategory,loading } = useGoogleFonts();
  const { handleChange, tempA, handleSelect } = useCustomhook();
  const PER_PAGE = 50;

  const {
    page,
    pageNumbers,
    pageItems: pageFonts,
    hasPrevGroup,
    hasNextGroup,
    goPrevGroup,
    goNextGroup,
    setPage,
  } = usePagination(fonts, PER_PAGE, 9);

  
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

          <SelectComponent
            values={category}
            event={(e) => setCategory(e.target.value)}
          >
            {FONT_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </SelectComponent>
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
        {hasPrevGroup && (
          <button 
          onClick={goPrevGroup}
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
        {hasNextGroup && (
          <button onClick={goNextGroup}
          className="arrow">
            &gt;
          </button>
        )}

      </div>
    </div>
  );
}
