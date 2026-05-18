# 장독대 프론트엔드

> 시장 독해를 대신 해드립니다.

장독대는 주식 입문자가 복잡한 시장 이슈를 쉽게 읽고, 핵심 용어와 짧은 퀴즈로 이해를 확인할 수 있도록 돕는 주식 큐레이션 서비스입니다.

백엔드와 데이터/LLM 파이프라인은 [`9990-jangdokdae/jangdokdae`](https://github.com/9990-jangdokdae/jangdokdae)에서 관리하고, 이 레포는 장독대 웹 프론트엔드를 관리합니다.

## 주요 화면

- `/` 오늘의 독해 홈
- `/mv` 이슈 탐색 피드
- `/mv/[id]` 이슈 상세와 주린이 번역, 용어 툴팁, 퀴즈
- `/market/indices` 코스피/코스닥 마켓 정보
- `/discover/*`, `/stock/*` 현재 참고/실험 화면

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react
- Pretendard Variable

## 시작하기

```bash
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:3000`입니다.

## 환경 변수

`.env.example`을 참고해 `.env.local`을 생성합니다.

```bash
cp .env.example .env.local
```

현재 MVP 화면은 정적/더미 데이터를 기반으로 동작합니다. 백엔드 API 연동 시 `NEXT_PUBLIC_API_BASE_URL`을 사용합니다.

## 검증

```bash
npm run lint
npm run typecheck
npm run build
```

## Git 컨벤션

**커밋 컨벤션**

| 태그 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 |
| `docs` | 문서 수정 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 패키지 설정 변경 |

## 문서

- `docs/DESIGN.md`: 장독대 프론트엔드 디자인 가이드
- `docs/API_SPEC.md`: 페이지별 API 명세서
- `docs/VERCEL_DEPLOYMENT.md`: Vercel 배포 가이드
