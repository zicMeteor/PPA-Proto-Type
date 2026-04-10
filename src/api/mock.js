// src/api/mock.js
// 가상파일

export const MOCK_PAPERS = [
  {
    id: 1,
    title: 'Attention Is All You Need',
    authors: 'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J.',
    year: 2017,
    journal: 'NeurIPS',
    citations: 87432,
    summary:
      'Transformer 아키텍처를 소개한 논문. Self-attention 메커니즘만으로 RNN 없이 번역 태스크에서 SOTA를 달성했습니다. 현대 LLM의 사실상 원형.',
  },
  {
    id: 2,
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
    authors: 'Devlin, J., Chang, M., Lee, K., Toutanova, K.',
    year: 2019,
    journal: 'NAACL',
    citations: 65210,
    summary:
      '양방향 Transformer 사전학습 방식(BERT)을 제안. 마스크 언어 모델링으로 11개 NLP 벤치마크에서 SOTA 달성.',
  },
  {
    id: 3,
    title: 'Language Models are Few-Shot Learners',
    authors: 'Brown, T., Mann, B., Ryder, N., Subbiah, M.',
    year: 2020,
    journal: 'NeurIPS',
    citations: 43100,
    summary:
      'GPT-3를 소개. 1750억 파라미터 모델이 몇 가지 예시만으로 다양한 태스크를 수행하는 few-shot 능력을 입증.',
  },
  {
    id: 4,
    title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
    authors: 'Dosovitskiy, A., Beyer, L., Kolesnikov, A.',
    year: 2021,
    journal: 'ICLR',
    citations: 38500,
    summary:
      'Vision Transformer(ViT) 제안. 이미지를 패치 시퀀스로 처리해 Transformer를 이미지 분류에 직접 적용. CNN 없이 SOTA 달성.',
  },
  {
    id: 5,
    title: 'Denoising Diffusion Probabilistic Models',
    authors: 'Ho, J., Jain, A., Abbeel, P.',
    year: 2020,
    journal: 'NeurIPS',
    citations: 21300,
    summary:
      'DDPM 제안. 정방향 노이즈 추가 → 역방향 노이즈 제거 학습으로 고품질 이미지 생성. Stable Diffusion의 이론적 근거.',
  },
  {
    id: 6,
    title: 'Training language models to follow instructions with human feedback',
    authors: 'Ouyang, L., Wu, J., Jiang, D.',
    year: 2022,
    journal: 'NeurIPS',
    citations: 14800,
    summary:
      'InstructGPT 소개. RLHF(인간 피드백 강화학습)로 LLM을 사람의 의도에 맞게 파인튜닝하는 방법론. ChatGPT의 직접적 기반.',
  },
];