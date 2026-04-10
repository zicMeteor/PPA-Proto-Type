import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

const PREVIEW_PAPERS = [
  {
    title: 'Attention Is All You Need',
    authors: 'Vaswani, A., Shazeer, N., Parmar, N. et al.',
    year: 2017,
    summary: 'Self-attention 메커니즘만을 사용하는 Transformer 아키텍처를 제안합니다. 기존 RNN/CNN 기반 시퀀스 모델의 한계를 극복하여 병렬 처리가 가능합니다.',
  },
  {
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin, J., Chang, M., Lee, K., Toutanova, K.',
    year: 2019,
    summary: '양방향 Transformer를 활용한 사전 학습 언어 모델을 제안합니다. 11개 NLP 벤치마크에서 최고 성능을 달성했습니다.',
  },
]

function HomePage() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [keywords, setKeywords] = useState([])
  const [resultCount, setResultCount] = useState(5)
  const [summaryEnabled, setSummaryEnabled] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  const addKeyword = (text) => {
    const trimmed = text.trim()
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed])
    }
    setInputValue('')
  }

  const removeKeyword = (target) => {
    setKeywords(keywords.filter((k) => k !== target))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addKeyword(inputValue)
    }
    if (e.key === 'Backspace' && !inputValue && keywords.length > 0) {
      setKeywords(keywords.slice(0, -1))
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputValue.trim()) addKeyword(inputValue)
    const allKeywords = inputValue.trim()
      ? [...keywords, inputValue.trim()]
      : keywords
    if (allKeywords.length === 0) return

    setIsSearching(true)
    setTimeout(() => {
      navigate('/results', {
        state: { keyword: allKeywords.join(', '), resultCount, summaryEnabled }
      })
    }, 800)
  }

  const countOptions = [3, 5, 10]

  return (
    <div className="home-page">
      <main className="home-main">
        <div className="hero-section">
          <h1 className="hero-title">
            논문을 검색하고<br />
            <span className="highlight">AI로 요약</span>하세요
          </h1>
          <p className="hero-desc">
            키워드를 입력하면 관련 논문을 찾아 핵심 내용을 요약해드립니다
          </p>
        </div>

        <form className="search-card" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <div className="keyword-input-area">
              {keywords.map((kw) => (
                <span key={kw} className="keyword-chip">
                  {kw}
                  <button
                    type="button"
                    className="chip-remove"
                    onClick={() => removeKeyword(kw)}
                    aria-label={`${kw} 제거`}
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="search-input"
                placeholder={keywords.length === 0 ? '논문 키워드를 입력하세요 (Enter로 추가)' : '키워드 추가...'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="options-row">
            <div className="option-group">
              <label className="option-label">결과 수</label>
              <div className="count-selector">
                {countOptions.map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={`count-btn ${resultCount === count ? 'active' : ''}`}
                    onClick={() => setResultCount(count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">AI 요약</label>
              <button
                type="button"
                className={`toggle ${summaryEnabled ? 'on' : ''}`}
                onClick={() => setSummaryEnabled(!summaryEnabled)}
                aria-label="요약 토글"
              >
                <span className="toggle-thumb" />
                <span className="toggle-text">{summaryEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`search-btn ${isSearching ? 'loading' : ''}`}
            disabled={keywords.length === 0 && !inputValue.trim() || isSearching}
          >
            {isSearching ? (
              <span className="spinner" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                논문 검색
              </>
            )}
          </button>
        </form>

        <div className="tags-section">
          <span className="tags-label">인기 키워드</span>
          {['LLM', 'Transformer', 'Diffusion Model', 'RAG', 'Fine-tuning'].map((tag) => (
            <button
              key={tag}
              className="tag"
              onClick={() => addKeyword(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <section className="preview-section">
          <div className="preview-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            예시 결과 미리보기
          </div>
          <p className="preview-desc">
            검색 결과는 아래와 같은 형태로 표시됩니다
          </p>
          <div className="preview-cards">
            {PREVIEW_PAPERS.map((paper, i) => (
              <div key={i} className="preview-card">
                <div className="preview-card-top">
                  <span className="preview-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="preview-year">{paper.year}</span>
                </div>
                <h3 className="preview-title">{paper.title}</h3>
                <p className="preview-authors">{paper.authors}</p>
                {summaryEnabled && (
                  <div className="preview-summary">
                    <span className="preview-summary-label">요약</span>
                    <p className="preview-summary-text">{paper.summary}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
