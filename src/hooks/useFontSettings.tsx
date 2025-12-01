import { defaultUnitValue, unitRanges } from "../arrays/SettingsConfig";

export default function useFontSettings(item: any, setItem: any) {

  // 단위 변경 + 값 초기화
  const changeUnit = (key: string, unit: string) => {

    const unitKey = key as keyof typeof defaultUnitValue;
    const unitType = unit as keyof typeof defaultUnitValue[typeof unitKey];

    const defaultValue = defaultUnitValue[unitKey][unitType];

    setItem((prev: any) => ({
      ...prev,
      [key]: defaultValue,
      [`${key}Unit`]: unit,
    }));
  };

  // 슬라이더 범위 계산
  const getRange = (key: string, unit: string) => {

    const rangeKey = key as keyof typeof unitRanges;

    if (!unitRanges[rangeKey]) {
      // 크기(size) 외에 spacing/height는 공통 range 쓰는 경우
      return { min: 1, max: 120, step: 1 };
    }

    const rangeUnit = unit as keyof typeof unitRanges[typeof rangeKey];

    return unitRanges[rangeKey][rangeUnit] ?? { min: 1, max: 120, step: 1 };
  };

  // 값 변경
  const changeValue = (key: string, value: number) => {
    setItem((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // preset radio 변경
  const changePreset = (key: string, value: any) => {
    setItem((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    changeUnit,
    getRange,
    changeValue,
    changePreset,
  };
}
