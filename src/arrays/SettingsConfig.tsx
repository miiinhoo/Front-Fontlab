

// 단위 타입
export type UnitType = "px" | "rem" | "em";

// 각 단위별 기본 값
export const defaultUnitValue = {
  size: { px: 16, rem: 1, em: 1 },
  spacing: { px: 0, rem: 0.01, em: 0.01 },
  height: { px: 20, rem: 1.2, em: 1.2 },
};

// 단위별 슬라이더 min/max/step
export const unitRanges = {
  size: {
    px: { min: 1, max: 120, step: 1 },
    rem: { min: 1, max: 12, step: 0.01 },
    em: { min: 1, max: 12, step: 0.01 },
  },
  weight: {
    min: 100,max:900, step:100
  },
  style:{},
  spacing: {
    px: { min: -10, max: 50, step: 0.1 },
    rem: { min: -1, max: 5, step: 0.01 },
    em: { min: -1, max: 5, step: 0.01 }
  }
};

// weight preset
export const weightPresets = [
  { label: "Light", value: 300 },
  { label: "Normal", value: 400 },
  { label: "Bold", value: 700 },
];

// style preset
export const fontStyles = [
  { label: "Normal", value: "normal" },
  { label: "Italic", value: "italic" },
];

// 최종 UI 구조
export const SettingBlocks = [
  {
    key: "size",
    label: "Font Size",
    type: "slider",         // 슬라이더 + 단위
    unit: true,
  },
  {
    key: "weight",
    label: "Font Weight",
    type: "slider-preset",  // 슬라이더 + preset
    presets: weightPresets,
    range: { min: 100, max: 900, step: 50 }, // 범위값 100~900까지 100씩 증/감
  },
  {
    key: "style",
    label: "Font Style",
    type: "preset",         // preset
    presets: fontStyles,
  },
  {
    key: "spacing",
    label: "Letter Spacing",
    type: "slider",         // 슬라이더 + 단위
    unit: true,
  },
];
