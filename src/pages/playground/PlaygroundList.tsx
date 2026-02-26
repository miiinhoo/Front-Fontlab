import { useEffect, useState } from "react";
import useCustomhook from "../../hooks/useCustomhook";
import { getFonts } from "../../api/fontsService";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import SelectComponent from "../../components/SelectComponent";
import { FONT_FILTER_OPTIONS } from "../../arrays/FilterArrays";
import { auth } from "../../firebase/firebase";

export default function PlaygroundList() {
  const { item, setItem, navigate } = useCustomhook();
  const { search, setSearch, category, setCategory } = useGoogleFonts();

  const [loading, setLoading] = useState(true);

  const username = auth.currentUser?.displayName;
  const user = auth.currentUser;

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

  // 각 family별로 가장 많이 눌린 clickCount 계산 (전체 기준)
  const familyClickStats = new Map<string, number>();
  (item as any[]).forEach((font: any) => {
    const current = familyClickStats.get(font.family) ?? 0;
    const click = font.clickCount ?? 0;
    if (click > current) {
      familyClickStats.set(font.family, click);
    }
  });

  let globalFamilyMaxClick = 0;
  familyClickStats.forEach((value) => {
    if (value > globalFamilyMaxClick) {
      globalFamilyMaxClick = value;
    }
  });

  const filtered = item.filter(
    (font: any) =>
      font.family.toLowerCase().includes(search.toLowerCase()) ||
      font.customname?.toLowerCase().includes(search.toLowerCase())
  );

  const familyMap = new Map<string, any>();
  filtered.forEach((font: any) => {
    if (!familyMap.has(font.family)) {
      familyMap.set(font.family, font);
    }
  });

  const cards = Array.from(familyMap.values());

  const handleCardClick = (font: any) => {
    navigate(`/playground/list/${encodeURIComponent(font.family)}`);
  };

  return (
    <section>
      <div className="page-inner">
        <div className="list-header">
          <h2>{username ? `${username}님의` : ""} 폰트 리스트</h2>
          <p className="list-subtext">
            프리셋이 하나라도 있는 폰트만 보여줍니다, explore에서 폰트를 생성해보세요.
          </p>
        </div>

        <p className="top-box" style={{ width:"100%"}}>
          <div className="left-box" />

          <div className="right-box" style={{ float:"right"}}>
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
          {
            !loading &&
            cards.map((font: any) => {
              const familyMax = familyClickStats.get(font.family) ?? 0;
              const isMyPick =
                globalFamilyMaxClick > 0 && familyMax === globalFamilyMaxClick;

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
                    <h3 style={{ fontFamily: font.family }}>{font.family}</h3>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
}