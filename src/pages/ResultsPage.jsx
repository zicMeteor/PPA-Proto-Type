import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ResultsPage.css'

const MOCK_PAPERS = [
  {
    id: 1,
    title: 'Attention Is All You Need',
    authors: 'Vaswani, A., Shazeer, N., Parmar, N. et al.',
    year: 2017,
    journal: 'NeurIPS 2017',
    citations: 95000,
    summary: 'Self-attention 메커니즘만을 사용하는 Transformer 아키텍처를 제안합니다. 기존 RNN/CNN 기반 시퀀스 모델의 한계를 극복하여 병렬 처리가 가능하며, 기계 번역 태스크에서 SOTA 성능을 달성했습니다. Multi-head attention을 통해 다양한 표현 부분 공간의 정보를 동시에 학습합니다.',
  },
  {
    id: 2,
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin, J., Chang, M., Lee, K., Toutanova, K.',
    year: 2019,
    journal: 'NAACL 2019',
    citations: 78000,
    summary: '양방향 Transformer를 활용한 사전 학습 언어 모델을 제안합니다. Masked Language Model(MLM)과 Next Sentence Prediction(NSP) 태스크로 대규모 코퍼스에서 사전 학습한 후, 다양한 NLP 다운스트림 태스크에 미세 조정하여 11개 벤치마크에서 최고 성능을 달성했습니다.',
  },
  {
    id: 3,
    title: 'GPT-4 Technical Report',
    authors: 'OpenAI',
    year: 2023,
    journal: 'arXiv preprint',
    citations: 12000,
    summary: '멀티모달 대규모 언어 모델 GPT-4의 기술 보고서입니다. 텍스트와 이미지 입력을 받아 텍스트를 출력하며, 다양한 전문 시험에서 인간 수준의 성능을 보여줍니다. RLHF를 통한 안전성 향상과 예측 가능한 스케일링에 대해 논의합니다.',
  },
  {
    id: 4,
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    authors: 'Lewis, P., Perez, E., Piktus, A. et al.',
    year: 2020,
    journal: 'NeurIPS 2020',
    citations: 4500,
    summary: '사전 학습된 언어 모델과 외부 지식 검색을 결합한 RAG 프레임워크를 제안합니다. 비매개변수적 메모리(검색 인덱스)와 매개변수적 메모리(생성 모델)를 통합하여, 지식 집약적 태스크에서 기존 모델 대비 큰 성능 향상을 달성했습니다.',
  },
  {
    id: 5,
    title: 'Denoising Diffusion Probabilistic Models',
    authors: 'Ho, J., Jain, A., Abbeel, P.',
    year: 2020,
    journal: 'NeurIPS 2020',
    citations: 15000,
    summary: '확산 확률 모델(Diffusion Probabilistic Model)을 활용한 고품질 이미지 생성 방법을 제안합니다. 노이즈를 점진적으로 추가하는 순방향 과정과 이를 역전시키는 역방향 과정을 학습하며, GAN에 필적하는 이미지 생성 품질을 달성했습니다.',
  },
  {
    id: 6,
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Hu, E., Shen, Y., Wallis, P. et al.',
    year: 2022,
    journal: 'ICLR 2022',
    citations: 8200,
    summary: '대규모 언어 모델의 효율적 미세 조정을 위한 Low-Rank Adaptation 기법을 제안합니다. 사전 학습된 가중치를 동결하고 저랭크 행렬을 학습함으로써 학습 파라미터 수를 대폭 줄이면서도 전체 미세 조정과 유사한 성능을 달성합니다.',
  },
  {
    id: 7,
    title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
    authors: 'Wei, J., Wang, X., Schuurmans, D. et al.',
    year: 2022,
    journal: 'NeurIPS 2022',
    citations: 6300,
    summary: 'Chain-of-Thought(CoT) 프롬프팅을 통해 대규모 언어 모델의 추론 능력을 향상시키는 방법을 제시합니다. 중간 추론 단계를 예시로 제공하면 산술, 상식, 기호 추론 태스크에서 성능이 크게 개선됨을 보여줍니다.',
  },
  {
    id: 8,
    title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
    authors: 'Dosovitskiy, A., Beyer, L., Kolesnikov, A. et al.',
    year: 2021,
    journal: 'ICLR 2021',
    citations: 32000,
    summary: 'Vision Transformer(ViT)를 제안하여 이미지를 패치 단위로 분할한 뒤 Transformer에 입력합니다. 대규모 데이터셋에서 사전 학습 시 CNN 기반 모델을 능가하는 성능을 보여주며, 컴퓨터 비전에서 Transformer의 가능성을 입증했습니다.',
  },
  {
    id: 9,
    title: 'Constitutional AI: Harmlessness from AI Feedback',
    authors: 'Bai, Y., Kadavath, S., Kundu, S. et al.',
    year: 2022,
    journal: 'arXiv preprint',
    citations: 2100,
    summary: 'AI 피드백을 활용한 Constitutional AI(CAI) 학습 방법을 제안합니다. 인간 피드백 대신 AI가 스스로를 비판하고 수정하는 과정을 통해 유해성을 줄이면서도 유용성을 유지하는 AI 시스템을 훈련합니다.',
  },
  {
    id: 10,
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention',
    authors: 'Dao, T., Fu, D., Ermon, S. et al.',
    year: 2022,
    journal: 'NeurIPS 2022',
    citations: 3800,
    summary: 'IO-aware 알고리즘을 활용하여 Transformer의 self-attention 연산을 가속화합니다. GPU 메모리 계층 구조를 고려한 타일링 기법으로 메모리 사용량을 줄이고, 기존 대비 2-4배 빠른 학습 속도를 달성하면서 정확한 attention 계산을 보장합니다.',
  },
]

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { keyword, resultCount, summaryEnabled } = location.state || {}
  const [expandedId, setExpandedId] = useState(null)
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!keyword) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => {
      const shuffled = [...MOCK_PAPERS].sort(() => Math.random() - 0.5)
      setPapers(shuffled.slice(0, resultCount || 5))
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [keyword, resultCount, navigate])

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
