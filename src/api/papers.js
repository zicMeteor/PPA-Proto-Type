// src/api/papers.js

import { MOCK_PAPERS } from './mock.js';
const USE_MOCK = true;
// ─────────────────────────────────────────

/**
 * 논문 검색 API
 * @param {{ keyword: string, limit: number, withSummary: boolean }} params
 * @returns {Promise<{ papers: Array }>}
 */
export async function searchPapers({ keyword, limit, withSummary }) {
  if (USE_MOCK) {
    // 목 데이터 딜레이 시뮬레이션 (선택)
    await new Promise((r) => setTimeout(r, 300));
    return { papers: MOCK_PAPERS.slice(0, limit) };
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword, limit, withSummary }),
  });

  if (!response.ok) {
    throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
  }

  return response.json();
}