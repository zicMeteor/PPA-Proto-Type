import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ResultsPage.css'
import '../api/mock.js'

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { keyword, resultCount, summaryEnabled } = location.state || {}
  const [expandedId, setExpandedId] = useState(null)
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  if (!keyword) return;

  setIsLoading(true);
  setError(null);

  searchPapers({ keyword, limit: resultCount, withSummary: summaryEnabled })
    .then(({ papers }) => {
      setPapers(papers);
    })
    .catch((err) => {
      console.error(err);
      setError('검색에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    })
    .finally(() => {
      setIsLoading(false);
    });
}, [keyword, resultCount, summaryEnabled]); 

  if (loading) {
    return (
      <div className="results-page">
        <main className="results-main">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p className="loading-text">
              &ldquo;<strong>{keyword}</strong>&rdquo; 관련 논문을 검색하고 있습니다...
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="results-page">
      <header className="results-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="m15 18-6-6 6-6" />
          </svg>
          뒤로
        </button>
      </header>

      <main className="results-main">
        <div className="results-info">
          <h1 className="results-title">
            &ldquo;<span className="keyword">{keyword}</span>&rdquo; 검색 결과
          </h1>
          <div className="results-meta">
            <span className="meta-badge">{papers.length}개 논문</span>
            <span className="meta-badge">
              AI 요약 {summaryEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        <div className="papers-list">
          {papers.map((paper, index) => (
            <article
              key={paper.id}
              className={`paper-card ${expandedId === paper.id ? 'expanded' : ''}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="paper-top">
                <span className="paper-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="paper-badges">
                  <span className="badge year">{paper.year}</span>
                  <span className="badge journal">{paper.journal}</span>
                </div>
              </div>

              <h2
                className="paper-title"
                onClick={() => setExpandedId(expandedId === paper.id ? null : paper.id)}
              >
                {paper.title}
              </h2>

              <p className="paper-authors">{paper.authors}</p>

              <div className="paper-stats">
                <span className="stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                  </svg>
                  {paper.citations.toLocaleString()} citations
                </span>
              </div>

              {summaryEnabled && (
                <div className={`paper-summary ${expandedId === paper.id ? 'show' : ''}`}>
                  <div className="summary-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
                    </svg>
                    AI 요약
                  </div>
                  <p className="summary-text">{paper.summary}</p>
                </div>
              )}

              <button
                className="expand-btn"
                onClick={() => setExpandedId(expandedId === paper.id ? null : paper.id)}
              >
                {expandedId === paper.id ? '접기' : summaryEnabled ? '요약 보기' : '상세 보기'}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                  className={expandedId === paper.id ? 'rotate' : ''}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ResultsPage
