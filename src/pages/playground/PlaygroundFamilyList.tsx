import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomhook from "../../hooks/useCustomhook";
import { getFonts, incrementClickCount } from "../../api/fontsService";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import SelectComponent from "../../components/SelectComponent";
import { FONT_FILTER_OPTIONS } from "../../arrays/FilterArrays";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";
import ButtonComponent from "../../components/common/ButtonComponent";
import useAuthForm from "../../hooks/useAuthForm";

export default function PlaygroundFamilyList() {
  const { item, setItem, navigate } = useCustomhook();
  const { search, setSearch, category, setCategory } = useGoogleFonts();
  const { family } = useParams<{ family?: string }>();

  const [loading, setLoading] = useState(true);
  const [sortByClick, setSortByClick] = useState<boolean>(false);

  const { user, username } = useAuthForm();

  const handleSortChange = (mode: "default" | "favorite") => {
    const isFavorite = mode === "favorite";
    setSortByClick(isFavorite);
    toast.success(isFavorite ? "자주 눌러본 순으로 정렬" : "기본순으로 정렬");
  };

  useEffect(() => {
    if (!user) {
      setItem([]);
      setLoading(false);
      return;
    }

    const fetchFonts = async () => {
      setLoading(true);
      const data = await getFonts(user.uid);
      setItem(data);
      setLoading(false);
    };

    fetchFonts();
  }, [user, setItem]);

  if (!auth.currentUser)
    return <div className="page-inner">로그인이 필요합니다.</div>;

  if (!item || item.length === 0)
    return <div className="page-inner">저장된 폰트가 없습니다.</div>;

  const decodedFamily = family ? decodeURIComponent(family) : undefined;

  if (!decodedFamily) {
    return <div className="page-inner">잘못된 접근입니다.</div>;
  }

  let cards: any[] = [];
  let maxClickCount = 0;

  const familyFiltered = item.filter(
    (font: any) => font.family === decodedFamily
  );

  const filtered = familyFiltered.filter(
    (font: any) =>
      font.family.toLowerCase().includes(search.toLowerCase()) ||
      font.customname?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = filtered.sort((a: any, b: any) =>
    sortByClick ? (b.clickCount ?? 0) - (a.clickCount ?? 0) : 0
  );

  cards = sorted;
  maxClickCount =
    sorted.length > 0
      ? Math.max(...sorted.map((font: any) => font.clickCount ?? 0))
      : 0;

  const handleCardClick = async (font: any) => {
    try {
      await incrementClickCount(font.id);

      setItem((prev: any) => {
        if (!Array.isArray(prev)) return prev;
        return prev.map((f: any) =>
          f.id === font.id
            ? { ...f, clickCount: (f.clickCount ?? 0) + 1 }
            : f
        );
      });

      navigate(`/playground/settings/${font.id}`);
    } catch (e: any) {
      console.error("에러:", e);
      toast.error(e);
    }
  };

  return (
    // 분리
    <section>
      <div className="page-inner">
        <div className="list-header">
          <h2>
            {username ? `${username}님의 ` : ""}
            {decodedFamily} 프리셋 리스트
          </h2>
          <p className="list-subtext">
            이 폰트로 저장해 둔 설정들이에요. 별칭을 사용하면 더 쉽게 구분할 수
            있습니다.
          </p>
        </div>

        <p className="top-box" style={{ width: "100%" }}>
          <div className="left-box">
            <ButtonComponent
              text="뒤로가기"
              cln="backbtn"
              event={() => navigate("/playground/list")}
            />

            <div className="sort-button">
              <button
                className={!sortByClick ? "active" : ""}
                onClick={() => handleSortChange("default")}
              >
                기본순
              </button>
              <button
                className={sortByClick ? "active" : ""}
                onClick={() => handleSortChange("favorite")}
              >
                즐겨찾기순
              </button>
            </div>
          </div>

          <div className="right-box" style={{ float: "right" }}>
            <input
              placeholder="폰트이름 또는 별칭 검색"
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
          </div>
        </p>

        <div className="font-grid">
          {!loading &&
            cards.map((font: any) => {
              const isMyPick =
                maxClickCount > 0 &&
                (font.clickCount ?? 0) === maxClickCount;

              return (
                <div
                  key={font.id}
                  className="font-card row"
                  onClick={() => handleCardClick(font)}
                >
                  <div className="font-card-main">
                    {isMyPick && (
                      <span className="my-pick-badge">MY PICK</span>
                    )}
                    <h3 style={{ fontFamily: font.family }}>
                      {font.customname || font.family}
                    </h3>
                  </div>

                  <div className="font">
                    {font.size && (
                      <span>
                        글자크기: {font.size}
                        {font.sizeUnit}
                      </span>
                    )}
                    {font.weight && <span>두께: {font.weight}</span>}
                    {font.style && <span>스타일: {font.style}</span>}
                    <span>
                      간격: {font.spacing}
                      {font.spacingUnit}
                    </span>
                    {font.customname && (
                      <span>별칭: {font.customname}</span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

