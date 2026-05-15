# API 명세서

이 문서는 장독대 프론트엔드가 기대하는 백엔드 API 응답 구조를 정리한다.

이번 버전의 중심은 새로 정비한 Issue Docent 콘텐츠다. 기존 단일 뉴스 기반 `issue-readings`, `/mv`, `jurini_translation` 명세는 Issue Docent 명세로 대체한다.

관련 결정 기록:

- [Issue Docent API / Frontend Decisions](./ISSUE_DOCENT_API_DECISIONS.md)

## 공통 규칙

- Base URL: `NEXT_PUBLIC_API_BASE_URL`
- MVP 기본값: `http://localhost:8000`
- API prefix: `/api/v1`
- 날짜/시간은 ISO 8601 문자열을 사용한다.
- 응답 필드는 백엔드 snake_case를 그대로 사용한다.
- 프론트 화면 경로와 API 경로는 분리한다.
- Issue Docent 구현에서는 `NEXT_PUBLIC_API_BASE_URL`을 그대로 사용한다.
- 날짜 표시 문구는 프론트가 ISO 문자열을 받아 `Intl.DateTimeFormat` 등으로 화면별 포맷을 적용한다.
- 백엔드는 `display_created_at`, `display_published_date` 같은 표시용 문자열을 내려주지 않는다.

```txt
/issue-docent/1 -> GET /api/v1/contents/issue-docent/1
```

## 상태 표기

API 명세는 백엔드 구현 상태와 프론트 소비 상태를 분리해서 표기한다.

| Status | 의미 |
|---|---|
| `구현됨` | 해당 영역 구현이 존재함 |
| `구현 필요` | 해당 영역 구현이 아직 없음 |
| `확장 필요` | 기존 구현은 있으나 새 계약 필드 반영이 필요함 |
| `코드 정리 필요` | 기능 코드는 있으나 API prefix/경로 정리가 필요 |
| `대체됨` | 이전 MVP 명세이며 새 API로 대체 |

## 공통 타입

```ts
type QuizKind = "term" | "issue";

interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}
```

## Issue Docent 목록 `/issue-docent`

Status: 백엔드 `구현됨` / 프론트 `구현됨`

피드 카드 렌더링을 위한 목록을 반환한다. 목록 API는 가볍게 유지하며 상세 본문, 원본 기사 목록, 용어 매칭 결과, 퀴즈를 포함하지 않는다.

### API

```http
GET /api/v1/contents/issue-docent?limit=20&offset=0
```

### Query

| 이름 | 타입 | 기본값 | 설명 |
|---|---:|---:|---|
| `limit` | `number` | `20` | 가져올 콘텐츠 수 |
| `offset` | `number` | `0` | 건너뛸 콘텐츠 수 |

### Response

```ts
interface IssueDocentListResponse {
  items: IssueDocentListItem[];
  total: number;
  limit: number;
  offset: number;
}

interface IssueDocentListItem {
  id: number;
  cluster_id: number;
  title: string;
  teaser: string;
  sector_companies: SectorCompanies[];
  article_count: number;
  created_at: string;
}

interface SectorCompanies {
  sector: string | null;
  companies: SectorCompany[];
}

interface SectorCompany {
  company_id: number | null;
  name: string;
  market: string | null;
}
```

### 목록 노출 규칙

- `title`, `teaser`, 메타 정보가 시각적으로 나뉘어 보이더라도 하나의 피드 아이템으로 취급한다.
- `teaser`는 피드 카드용 문구다.
- 목록에는 `summary`, `explanation`, `articles`, `matched_terms`, `quizzes`를 포함하지 않는다.
- `article_count`가 1이면 단일 기사 기반 Issue Docent로 볼 수 있다.
- 목록 카드에서는 `sector_companies`를 사용해 섹터를 상위, 종목을 하위 정보로 표시한다.
- `sector_companies`는 백엔드가 `entity_extraction.company_names`와 `company_master`를 조합해 만드는 화면용 projection이다.
- 새 Issue Docent API에서는 `company_names`, `sectors`를 별도 응답 필드로 유지하지 않고 `sector_companies`로 완전히 대체한다.
- `company_master` 매칭에 실패한 종목도 제거하지 않으며 `company_id`, `sector`, `market`은 `null`로 내려 실패를 숨기지 않는다.
- `sector_companies`는 `entity_extraction.company_names`의 순서를 최대한 보존한다.
- 종목 매칭은 `company_master.krx_name` 정확 일치를 우선하고, 실패 시 `company_master.dart_name` 정확 일치를 확인한다.
- exact match 결과가 여러 건이면 정상 매칭으로 보지 않고 해당 종목을 null 메타로 응답한다.
- `sector: null`인 종목들은 하나의 null 그룹으로 묶는다.
- 종목 `name`은 매칭 성공 시 `company_master.krx_name`, 실패 시 원래 `entity_extraction.company_names` 값을 사용한다.
- `sector`, `market`은 `company_master` 값을 별도 라벨 변환 없이 그대로 노출한다.
- 카드 전체를 클릭 가능하게 처리하고, 클릭 시 `/issue-docent/[id]` 상세로 이동한다.
- 별도 `자세히 보기` 버튼은 현재 MVP 범위에서 제외한다.
- 필터/정렬 UI는 현재 MVP 범위에서 제외하고, API 응답 순서를 그대로 렌더링한다.
- 목록은 로딩, 에러, 빈 목록 상태를 가진다.

## Issue Docent 상세 `/issue-docent/[id]`

Status: 백엔드 `구현됨` / 프론트 `구현됨`

도슨트 본문, 원본 기사 목록, 문단별 용어 매칭 결과, 퀴즈를 반환한다.

### API

```http
GET /api/v1/contents/issue-docent/{issue_docent_id}
```

### Response

```ts
interface IssueDocentDetailResponse {
  id: number;
  cluster_id: number;
  title: string;
  teaser: string;
  sector_companies: SectorCompanies[];
  article_count: number;
  explanation: ExplanationSection[];
  articles: SourceArticle[];
  quizzes: IssueDocentQuiz[];
  created_at: string;
}
```

### 상세 화면 소비 규칙

- 상세 화면은 본문과 퀴즈 중심으로 구성한다.
- 상세 상단의 `title`과 `원문 보기` 버튼은 하나의 상세 헤더 영역 안에 배치한다.
- `teaser`는 상세의 핵심 노출 요소가 아니라 피드 카드용 문구다.
- 원본 기사는 상세 본문에 직접 펼치지 않고 `원문 보기` 팝업에서 제공한다.
- 화면 구성 순서는 `explanation` 본문 렌더링 후 `quizzes` 렌더링으로 한다.
- 상세 API에 포함된 `articles` 배열만 사용하며, 원문 기사용 별도 API는 만들지 않는다.
- 상세는 로딩, 에러, 찾을 수 없음 상태를 가진다.

## Explanation

Status: 백엔드 `구현됨` / 프론트 `구현됨`

```ts
interface ExplanationSection {
  section_type: string;
  title: string;
  paragraphs: ExplanationParagraph[];
}

interface ExplanationParagraph {
  text: string;
  matched_terms: MatchedTerm[];
}
```

`matched_terms`는 DB에 저장된 값이 아니라 API 서버가 `issue_docent.explanation`과 `stock_terms`를 비교해 만든 파생 응답이다.

## 용어 매칭

Status: 백엔드 `구현됨` / 프론트 `구현됨`

```ts
interface MatchedTerm {
  term_id: number;
  term: string;
  category: string;
  definition: string;
  start: number;
  end: number;
}
```

### 프론트 소비 규칙

- 프론트는 `start`, `end`를 기준으로 본문 안의 용어를 클릭 가능한 텍스트로 표시한다.
- 한 문단에 같은 용어가 여러 번 등장하면 모든 등장 위치를 클릭 가능하게 표시한다.
- 용어 설명은 단순 툴팁이 아니라 중앙 모달로 제공한다.
- 용어 모달에는 `term`, `category`, `definition`을 표시한다.
- `category`는 표시할 수 있다.
- `source_name`, `source_url`은 Issue Docent API 응답에 포함하지 않는다.
- 별도 용어 상세 API는 만들지 않고, 상세 API의 `matched_terms`만 사용한다.
- 현재 단계에서는 모바일 전용 UI를 고려하지 않는다.

## 원본 기사

Status: 백엔드 `구현됨` / 프론트 `구현됨`

```ts
interface SourceArticle {
  article_id: string;
  title: string;
  press: string | null;
  published_date: string;
  url: string;
}
```

### 프론트 소비 규칙

- 상세 헤더 영역의 `원문 보기` 버튼을 누르면 원본 기사 목록 팝업을 연다.
- 원문 보기 팝업도 용어 설명과 같은 중앙 모달 패턴을 사용한다.
- 팝업에는 기사 제목, 언론사, 발행일, 원문 URL 이동을 제공한다.
- 발행일 표시는 프론트가 `published_date` ISO 문자열을 포맷팅한다.
- 팝업 데이터는 상세 API 응답에 이미 포함된 `articles` 배열만 사용한다.
- 원본 기사 본문 `content`는 API 응답에 포함하지 않는다.
- 목록 API에는 원본 기사 정보를 포함하지 않는다.

## 퀴즈

Status: 백엔드 `구현됨` / 프론트 `구현됨`

퀴즈는 Issue Docent 상세 응답의 일부로 제공한다. API 필드 구조는 기존 프론트 퀴즈 구조를 유지한다.

```ts
interface IssueDocentQuiz {
  quiz_id: string;
  kind: QuizKind;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
}
```

### 퀴즈 규칙

- 상세 API는 `quizzes`를 항상 배열로 반환한다.
- 퀴즈는 항상 2개다.
- 각 퀴즈는 4지선다 객관식이다.
- `answer_index`는 `options`의 0-based index다.
- `quiz_id`는 백엔드가 `quiz-1`, `quiz-2`로 부여한다.
- `stock_terms` 매칭 용어가 있으면 `quiz-1`은 `term`, `quiz-2`는 `issue`다.
- 매칭 용어가 없으면 `quiz-1`, `quiz-2` 모두 `issue`다.
- `term` 퀴즈는 반드시 `stock_terms` 매칭 용어에서만 생성한다.
- 프론트는 본문 아래에 퀴즈를 렌더링한다.
- 사용자가 선택지를 클릭하면 즉시 정답/오답과 `explanation` 해설을 표시한다.
- 퀴즈 선택 상태는 상세 클라이언트 컴포넌트의 로컬 state로 관리한다.
- 현재 MVP에서는 선택 결과를 저장하지 않는다.
- 사용자는 선택 후에도 다른 선택지로 변경할 수 있다.
- 별도 제출 버튼, 점수 저장, 랭킹은 현재 MVP 범위에서 제외한다.
- 향후 학습 기록, 오답 저장, 사용자 진도 기능이 필요해지면 저장 방식을 별도 설계한다.

## Issue Docent 프론트 구현 규칙

- 구현 순서는 API 타입/client 정리 후 목록과 상세 UI 연결 순으로 진행한다.
- API 타입은 공용 타입 디렉터리에 분리하고 페이지/컴포넌트 내부에서 중복 정의하지 않는다.
- 기존 API 호출 패턴을 먼저 확인하되, 새 Issue Docent 구조에 맞지 않으면 이번 작업에서 정리한다.
- 목록/상세 데이터 fetch는 서버 컴포넌트에서 수행한다.
- 목록/상세 API fetch는 현재 MVP에서 `cache: "no-store"`로 호출한다.
- 이후 사용자 경험과 비용 효율성을 위해 `revalidate`, SWR 계열 클라이언트 캐시, 또는 태그 기반 재검증을 적용할 수 있다.
- `created_at`, `published_date` 표시 문자열은 프론트에서 생성한다.
- 본문 렌더링, 원문 모달, 용어 모달, 퀴즈 선택 상태는 하나의 상세 클라이언트 컴포넌트가 관리한다.
- 기존 모달/다이얼로그 컴포넌트가 있으면 사용하고, 없으면 원문 보기와 용어 설명이 공유하는 최소 공통 모달을 만든다.
- 기존 `/mv` 더미 데이터 의존은 제거하고, 더 이상 사용하지 않는 더미 데이터/컴포넌트는 참조 확인 후 삭제한다.
- 카드 메타는 `sector_companies`를 기준으로 섹터 아래 종목을 배치한다. 기존 칩을 같은 레벨에서 가로 나열하는 구조는 그대로 유지하지 않는다.
- 상세 헤더도 목록 카드와 같은 `sector_companies` 메타 구조를 사용한다.
- `sector_companies`가 빈 배열이면 메타 영역 자체를 숨긴다.

## Auth

Status: `프론트 호출 경로 정리 완료 / 백엔드 라우터 prefix 반영`

로그인 API도 `/api/v1` prefix 아래에 둔다. 기존 `/auth/*` 경로는 `/api/v1/auth/*`로 정리했다.

auth 백엔드는 `jangdokdae-server`에서 관리하므로, 해당 레포의 라우터 prefix와 OAuth callback URL 생성 코드도 같은 기준으로 맞춘다.

### API

```http
GET /api/v1/auth/kakao/login
GET /api/v1/auth/kakao/callback
GET /api/v1/auth/google/login
GET /api/v1/auth/google/callback
GET /api/v1/auth/me
POST /api/v1/auth/logout
```

### Response

```ts
interface AuthUser {
  id: number;
  provider: string;
  provider_id: string;
  nickname: string;
}
```

OAuth callback URL 생성 코드도 `/api/v1/auth/{provider}/callback` 기준으로 맞춘다.

## User Profile

Status: `프론트 호출 경로 정리 완료 / 백엔드 라우터 prefix 반영`

현재 구현 의미를 유지하고 `/api/v1` prefix만 붙인다.

### API

```http
GET /api/v1/user/profile
PUT /api/v1/user/profile
```

### Request

```ts
interface InterestProfileBody {
  sectors: string[];
  companies: string[];
}
```

### Response

```ts
interface InterestProfileResponse {
  sectors: string[];
  companies: string[];
}
```

## 마켓 정보 `/market/indices`

Status: `구현 필요`

프론트의 별도 시장 정보 화면에서 사용할 API다. Issue Docent API와는 별도 범위다.

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

## 대체된 명세

Status: `대체됨`

다음 명세는 새 Issue Docent 구조로 대체한다.

```http
GET /api/v1/issue-readings/today
GET /api/v1/issue-readings
GET /api/v1/issue-readings/{id}
```

대체 이유:

- 기존 구조는 단일 뉴스 기반 콘텐츠를 전제로 했다.
- 새 구조는 클러스터 1개 = Issue Docent 콘텐츠 1개를 기준으로 한다.
- 기존 `jurini_translation.explanation`, `terms`, `highlight_explanation_index`는 새 `explanation.sections[].paragraphs[].matched_terms` 구조로 대체한다.
- 기존 `/mv` 프론트 경로는 `/issue-docent`로 전환하고, 임시 redirect는 남기지 않는다.
