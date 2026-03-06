// src/hooks/usePagination.ts
import { useState } from "react";

export default function usePagination(items: any[], perPage: number, groupSize: number = 9) {
  const [page, setPage] = useState<number>(1);

  // 총 페이지 수 계산 ( 최소 1 페이지 )
  const totalPages = Math.ceil(items.length / perPage) || 1;

  // 현재 페이지네이션 그룹 계산 ( 현재페이지 / 9 )
  
  const currentGroup = Math.ceil(page / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageItems = items.slice(start, end);

  const hasPrevGroup = currentGroup > 1;
  const hasNextGroup = endPage < totalPages;

  const goPrevGroup = () => {
    if (!hasPrevGroup) return;
    setPage(startPage - groupSize);
  };

  const goNextGroup = () => {
    if (!hasNextGroup) return;
    setPage(endPage + 1);
  };

  return {
    // 상태
    page,
    totalPages,

    // 페이지 넘버들
    pageNumbers,

    // 현재 페이지에 보여줄 데이터
    pageItems,

    // 이전/다음 그룹 여부 + 이동 함수
    hasPrevGroup,
    hasNextGroup,
    goPrevGroup,
    goNextGroup,

    // 필요하면 바깥에서 직접 페이지 바꾸고 싶을 때
    setPage,
  };
}