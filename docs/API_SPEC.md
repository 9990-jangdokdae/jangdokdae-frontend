# API 명세서

이 문서는 장독대 프론트엔드가 기대하는 백엔드 API 응답 구조를 페이지 기준으로 정리합니다.

백엔드와 데이터/LLM 파이프라인의 구현 원천은 `9990-jangdokdae/jangdokdae` 레포입니다. 이 문서는 프론트엔드 소비자 관점의 계약이며, 백엔드 OpenAPI 문서가 확정되면 그 명세와 동기화합니다.

## 공통 규칙

- Base URL: `NEXT_PUBLIC_API_BASE_URL`
- MVP 기본값: `http://localhost:8000`
- API prefix: `/api/v1`
- 날짜/시간은 ISO 8601 문자열을 우선 사용합니다.
- 현재 MVP 상세 ID는 `news_id`입니다.
- 향후 이슈 테이블이 도입되면 `issue_id`를 상세 식별자로 전환할 수 있습니다.

## ID 규칙

현재는 이슈가 단일 뉴스 기반으로 구성되므로 프론트 상세 경로 `/mv/[id]`의 `[id]`는 백엔드 `news_id`와 같습니다.

```txt
/mv/1 -> GET /api/v1/issue-readings/1
```

향후 여러 뉴스를 하나의 이슈로 묶는 구조가 도입되면:

- `issue_id`가 있으면 `issue_id`를 대표 ID로 사용합니다.
- `issue_id`가 없으면 `news_id`를 사용합니다.
- 기존 slug 기반 URL은 지원하지 않습니다.

## 공통 타입

```ts
type Id = number | string;

type QuizKind = "term" | "issue";

interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}
```

## 오늘의 독해 홈 `/`

### 필요한 데이터

- 내 관심 이슈
- 전체 시장 이슈
- 사용자 관심 섹터/종목

### API

```http
GET /api/v1/issue-readings/today
GET /api/v1/users/me/interests
PUT /api/v1/users/me/interests
```

### `GET /api/v1/issue-readings/today`

홈 화면에 필요한 이슈 묶음을 반환합니다.

```ts
interface TodayIssueReadingsResponse {
  interest_items: IssueReadingListItem[];
  market_items: IssueReadingListItem[];
}
```

## 이슈 탐색 `/mv`

### 필요한 데이터

- 관심 이슈 목록
- 전체 이슈 목록
- 필터/정렬 옵션 자리

### API

```http
GET /api/v1/issue-readings
GET /api/v1/issue-readings?scope=interest
```

### Query

| 이름 | 타입 | 설명 |
|------|------|------|
| `scope` | `"all" | "interest"` | 전체/관심 이슈 범위 |
| `order` | `"latest"` | MVP에서는 최신순만 사용 |
| `limit` | `number` | 페이지 크기 |
| `cursor` | `string` | 다음 페이지 커서 |

### Response

```ts
interface IssueReadingListResponse {
  items: IssueReadingListItem[];
  next_cursor: string | null;
}

interface IssueReadingListItem {
  news_id: Id;
  issue_id: Id | null;
  title: string;
  summary: string;
  collected_at: string;
  published_at: string;
  source_name: string;
  sector: string[];
  company: string[];
  keyword: string[];
  quiz_count: number;
}
```

## 이슈 상세 `/mv/[id]`

### API

```http
GET /api/v1/issue-readings/{id}
```

`{id}`는 현재 MVP에서 `news_id`입니다.

### Response

```ts
interface IssueReadingDetailResponse {
  news_id: Id;
  issue_id: Id | null;
  news_title: string;
  collected_at: string;
  published_at: string;
  source_name: string;
  sector: string[];
  company: string[];
  keyword: string[];
  jurini_translation: JuriniTranslation;
  quizzes: QuizQuestion[];
}

interface JuriniTranslation {
  title: string;
  explanation: string[];
  highlight_explanation_index: number | null;
  terms: JuriniTerm[];
}

interface JuriniTerm {
  term: string;
  explanation: string;
}

interface QuizQuestion {
  quiz_id: string;
  kind: QuizKind;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
}
```

### Highlight 규칙

`highlight_explanation_index`는 `explanation` 배열에서 강조할 문단의 0-based index입니다.

- 강조 문단은 최대 1개입니다.
- 강조할 문단이 명확하지 않으면 `null`을 사용합니다.
- 핵심 시장 반응, 주요 원인, 기업/섹터와의 연결이 있는 문단을 우선합니다.
- 단순 배경 설명이나 출처 문단은 피합니다.

### Quiz 규칙

MVP 상세 화면은 이슈당 객관식 퀴즈 2개를 기대합니다.

- 용어 퀴즈 1개: `kind = "term"`
- 이슈 이해 퀴즈 1개: `kind = "issue"`

`explanation`은 사용자가 답을 선택한 뒤 보여주는 문제 해설입니다.

## 마켓 정보 `/market/indices`

### API

```http
GET /api/v1/market/indices
```

### Response

```ts
interface MarketIndicesResponse {
  items: MarketIndex[];
}

interface MarketIndex {
  id: "kospi" | "kosdaq";
  name: string;
  base_time: string;
  value: number;
  change: number;
  change_rate: number;
  points: number[];
}
```

## 섹터 목록

### API

```http
GET /api/v1/sectors
```

### Response

```ts
type SectorsResponse = string[];
// 예: ["반도체", "자동차/모빌리티", "2차전지", ...]
// 백엔드 apps/src/config/sectors.py의 SECTORS와 동일
```

프론트엔드의 `useSectors` hook이 이 엔드포인트를 사용합니다. API 준비 전까지는 `src/constants/sectors.ts` 상수를 fallback으로 사용합니다.

## 관심사 설정

### API

```http
GET /api/v1/users/me/interests
PUT /api/v1/users/me/interests
```

### Response

```ts
interface InterestProfile {
  sectors: string[];
  companies: string[];
}
```

## 현재 프론트 더미 데이터

현재 프론트엔드는 백엔드 응답 형태를 흉내 낸 `BackendIssueReading` 더미 데이터를 `Issue` UI 모델로 매핑합니다.

- 첫 번째 더미 데이터의 `news_id = 1`은 `data/mock-data.json`의 `news_id`와 맞춥니다.
- 나머지 `news_id = 2, 3, 4`는 프론트 데모용 임시 값입니다.
- 실제 API 연동 시에는 `GET /api/v1/issue-readings...` 응답으로 대체합니다.
