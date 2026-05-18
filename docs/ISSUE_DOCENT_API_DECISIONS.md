# Issue Docent API / Frontend Decisions

이 문서는 `docs/API_SPEC.md`를 다시 작성하기 전에 합의한 Issue Docent API와 프론트엔드 소비 구조를 기록한다.

최종 API 계약은 `docs/API_SPEC.md`에 반영한다. 이 문서는 결정 배경과 구현 시 헷갈릴 수 있는 경계 조건을 보존하기 위한 작업 기록이다.

## 1. 문서 범위

- 이번 API 명세의 중심은 새로 정비한 Issue Docent 콘텐츠다.
- 기존 `issue-readings`, `/mv`, 기존 단일 뉴스 기반 주린이 번역 명세는 새 Issue Docent 명세로 대체한다.
- 기존 명세는 `API_SPEC.md`에 길게 유지하지 않고, 하단에 "대체됨" 정도로만 짧게 기록한다.
- `/market/indices`는 Issue Docent와 분리된 별도 화면용 API로 남긴다. 현재 구현되지 않은 것으로 보고 `Status`에 구현 필요 상태를 명시한다.
- 각 API에는 백엔드 구현 상태와 프론트 소비 상태를 분리한 `Status`를 붙인다.

## 2. API Prefix와 Auth/User 경로

프론트엔드 API는 예외 없이 `/api/v1` prefix를 사용한다.

로그인/유저 API는 명세와 코드 모두 `/api/v1` 하위로 맞춘다.

확정 경로:

```http
GET /api/v1/auth/kakao/login
GET /api/v1/auth/kakao/callback
GET /api/v1/auth/google/login
GET /api/v1/auth/google/callback
GET /api/v1/auth/me
POST /api/v1/auth/logout

GET /api/v1/user/profile
PUT /api/v1/user/profile
```

`user/profile`은 현재 구현 의미를 유지하고 prefix만 붙인다. 이름을 `users/me/interests`로 바꾸는 정리는 이번 단계에서는 하지 않는다.

OAuth callback URL 생성 코드도 `/api/v1/auth/{provider}/callback` 기준으로 맞춘다.

## 3. Issue Docent API 경로

프론트 라우트와 API 경로는 역할을 분리한다.

- 프론트 화면 경로: `/issue-docent`, `/issue-docent/[id]`
- API 경로: `/api/v1/contents/issue-docent`
- 기존 `/mv` 화면은 `/issue-docent`로 전환하고 임시 redirect는 남기지 않는다.

확정 API:

```http
GET /api/v1/contents/issue-docent
GET /api/v1/contents/issue-docent/{issue_docent_id}
```

API 경로는 현재 백엔드 구현을 기준으로 한다.

날짜/시간 응답은 ISO 문자열을 유지한다. `created_at`, `published_date`를 화면에 표시할 때는 프론트에서 `Intl.DateTimeFormat` 등으로 포맷한다. 백엔드는 표시용 문자열 필드를 추가하지 않는다.

## 4. 목록 API

목록 API는 피드 카드 렌더링을 위한 데이터만 제공한다.

확정 페이지네이션:

```http
GET /api/v1/contents/issue-docent?limit=20&offset=0
```

응답은 `items`, `total`, `limit`, `offset` 구조를 사용한다. 기존 cursor 기반 명세는 사용하지 않는다.

목록 아이템 필드:

```ts
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

목록 API에는 `summary`, `articles`, `matched_terms`, `quizzes`를 포함하지 않는다.

피드 카드에서 `title`, `teaser`, 메타 정보가 시각적으로 나뉘어 보이더라도 하나의 피드 아이템으로 취급한다.

카드 메타 정보는 `sector_companies`를 사용해 섹터를 상위, 종목을 하위 정보로 보여준다. `company_names`, `sectors`를 같은 레벨의 칩으로 단순 가로 나열하는 기존 표현은 유지하지 않는다. 새 API 응답에서는 두 평면 필드를 제거하고 `sector_companies`로 완전히 대체한다.

`sector_companies`는 독립 회사 리소스가 아니라 Issue Docent 카드/상세 렌더링을 위한 projection이다. 백엔드는 `entity_extraction.company_names`와 `company_master`를 조합해 이 값을 만든다.

향후 종목/섹터 검색, 관심 종목 설정, 관심 섹터 설정 기능이 추가되면 `company_master` 기반 독립 `companies`/`sectors` API를 별도로 설계한다. 그 경우에도 카드 렌더링을 위해 Issue Docent 응답의 `sector_companies` projection은 유지할 수 있다.

projection 규칙:

- `entity_extraction.company_names` 순서를 최대한 보존한다.
- `company_master.krx_name` 정확 일치를 우선하고, 실패 시 `company_master.dart_name` 정확 일치를 확인한다.
- `company_master` 매칭에 실패한 종목도 제거하지 않는다.
- 매칭 실패 종목은 `company_id: null`, `sector: null`, `market: null`로 응답해 데이터 품질 문제를 숨기지 않는다.
- exact match 결과가 여러 건이면 정상 매칭으로 보지 않고 해당 종목을 null 메타로 응답한다.
- `sector: null`인 종목은 하나의 null 그룹으로 묶는다.
- 회사 `name`은 매칭 성공 시 `company_master.krx_name`, 실패 시 원래 `entity_extraction.company_names` 문자열을 사용한다.
- `sector`, `market`은 별도 표시명 변환 없이 `company_master` 값을 그대로 사용한다.

프론트 소비 규칙:

- 카드 전체를 클릭 가능하게 처리하고 `/issue-docent/[id]` 상세로 이동한다.
- 별도 `자세히 보기` 버튼은 만들지 않는다.
- 필터/정렬 UI는 현재 MVP 범위에서 제외한다.
- API 응답 순서를 그대로 렌더링한다.
- 메타 표현은 `sector_companies`를 기준으로 섹터 아래 종목을 배치한다.
- 상세 헤더도 목록 카드와 같은 `sector_companies` 메타 구조를 사용한다.
- `sector_companies`가 빈 배열이면 메타 영역은 렌더링하지 않는다.

## 5. 상세 API

상세 화면은 본문과 퀴즈를 중심으로 구성한다.

상세 상단의 `title`과 `원문 보기` 버튼은 하나의 상세 헤더 영역 안에 배치한다. `teaser`는 상세 화면의 핵심 노출 요소가 아니라 피드 카드용 문구로 본다.

상세 응답 주요 필드:

```ts
interface IssueDocentDetailResponse {
  id: number;
  cluster_id: number;
  title: string;
  teaser: string;
  sector_companies: SectorCompanies[];
  article_count: number;
  summary: SummaryContent;
  articles: SourceArticle[];
  quizzes: IssueDocentQuiz[];
  created_at: string;
}
```

`articles`는 상세 본문에 직접 펼치지 않는다. 상세 헤더 영역의 `원문 보기` 버튼을 누르면 원본 기사 목록 팝업에서 제공한다.

상세 화면은 `summary` 본문을 먼저 렌더링하고, 그 아래에 `quizzes`를 렌더링한다. 본문에는 별도 고정 heading을 붙이지 않는다.

## 6. Summary와 용어 매칭

`matched_terms`는 상세 응답의 문단 단위에 둔다.

```ts
interface SummaryContent {
  paragraphs: SummaryParagraph[];
}

interface SummaryParagraph {
  text: string;
  matched_terms: MatchedTerm[];
}

interface MatchedTerm {
  term_id: number;
  term: string;
  category: string;
  definition: string;
  start: number;
  end: number;
}
```

`summary`는 DB에 저장된 `issue_docent.summary` 텍스트를 API 서버가 문단 단위로 변환한 응답이다. `matched_terms`는 DB에 저장하지 않고, API 서버가 `issue_docent.summary`와 `stock_terms`를 비교해 만든다.

프론트는 `start`, `end`를 기준으로 본문 안의 용어를 클릭 가능한 텍스트로 표시한다.

용어 설명은 단순 툴팁이 아니라 팝업으로 제공한다. 정의가 길어질 수 있기 때문이다.

확정된 프론트 소비 규칙:

- 같은 문단에 같은 용어가 여러 번 등장하면 모든 등장 위치를 클릭 가능하게 표시한다.
- 용어 설명은 중앙 모달로 제공한다.
- 모달에는 `term`, `category`, `definition`을 표시한다.
- 별도 용어 상세 API는 만들지 않고 상세 API의 `matched_terms`만 사용한다.

현재 단계에서는 모바일 전용 UI를 고려하지 않는다.

## 7. 원본 기사 팝업

원본 기사는 상세 화면의 `원문 보기` 버튼을 통해 팝업으로 보여준다.

```ts
interface SourceArticle {
  article_id: string;
  title: string;
  press: string | null;
  published_date: string;
  url: string;
}
```

팝업에는 기사 제목, 언론사, 발행일, 원문 URL 이동을 제공한다.

확정된 프론트 소비 규칙:

- 원문 보기 팝업은 용어 설명과 동일한 중앙 모달 패턴을 사용한다.
- 팝업 데이터는 상세 API 응답의 `articles` 배열만 사용한다.
- 원문 기사 목록이나 기사 상세를 위한 별도 API는 만들지 않는다.
- 발행일 표시는 프론트가 `published_date` ISO 문자열을 포맷한다.

목록 API에는 원본 기사 정보를 포함하지 않는다.

## 8. 퀴즈

퀴즈는 Issue Docent 콘텐츠 산출물에 종속된다.

백엔드 저장 구조:

- `issue_docent.quizzes JSONB NOT NULL DEFAULT '[]'` 추가
- 퀴즈는 최종 `issue_docent.summary` 생성 이후 별도 단계에서 생성
- 이슈당 객관식 퀴즈 2개 생성
- 선택지는 4지선다
- 퀴즈 생성 실패 시 `issue_docent` row를 저장하지 않고 클러스터 전체를 실패 처리
- 퀴즈 LLM 입력은 `issue_docent.summary`만 사용
- `matched_terms`는 DB에 저장하지 않고 퀴즈 생성 입력으로만 사용
- `stock_terms` 매칭 용어가 있으면 용어 이해 퀴즈 1개와 이슈 이해 퀴즈 1개를 생성
- `stock_terms` 매칭 용어가 없으면 이슈 이해 퀴즈 2개를 생성
- `term` 퀴즈는 반드시 `stock_terms` 매칭 용어에서만 생성
- `quiz_id`는 LLM이 만들지 않고 백엔드가 `quiz-1`, `quiz-2`로 부여
- 매칭 용어가 있으면 `quiz-1 = term`, `quiz-2 = issue`
- 매칭 용어가 없으면 `quiz-1 = issue`, `quiz-2 = issue`
- 퀴즈 구조 검증 실패 시 LLM 재시도 1회, 재시도도 실패하면 클러스터 전체 실패

API 필드 구조는 기존 프론트 구조를 유지한다.

```ts
type QuizKind = "term" | "issue";

interface IssueDocentQuiz {
  quiz_id: string;
  kind: QuizKind;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
}
```

퀴즈 API 응답 구조 자체는 기존과 크게 바꾸지 않는다. 다만 기존 `issue-readings` 상세 응답에 있던 퀴즈가 아니라 새 Issue Docent 상세 응답의 `quizzes` 필드로 제공한다.

프론트 소비 규칙:

- 퀴즈는 본문 아래에 배치한다.
- 사용자가 선택지를 클릭하면 즉시 정답/오답과 해설을 표시한다.
- 별도 제출 버튼, 점수 저장, 랭킹은 현재 MVP 범위에서 제외한다.

퀴즈 프롬프트는 `app/prompts/quiz.md`로 분리한다. Pydantic 검증은 퀴즈 수, `kind`, 선택지 수, `answer_index`, 빈 문자열 여부, `term` 퀴즈 허용 여부처럼 구조와 기계적으로 확인 가능한 규칙만 담당한다. 투자 판단 금지나 해석 과잉 여부는 프롬프트와 실행 결과 리뷰로 개선한다.

## 9. 프론트 구현 방향

기존 `/mv` 화면은 `/issue-docent`로 전환한다. 현재 `/mv`를 직접 작업하는 인원이 없으므로 임시 redirect는 남기지 않는다.

필요한 수정 축:

- 피드 목록: `/api/v1/contents/issue-docent` 목록 API 소비
- 상세 화면: `/api/v1/contents/issue-docent/{issue_docent_id}` 상세 API 소비
- 기존 단일 뉴스 기반 `jurini_translation` 구조 제거
- `summary.paragraphs[]` 렌더링
- 문단별 `matched_terms` 기반 용어 클릭 처리
- 용어 팝업 추가
- `원문 보기` 팝업 추가
- 본문 이후 퀴즈 렌더링
- auth/user API 호출 경로 `/api/v1` prefix 반영

모바일 전용 레이아웃은 이번 범위에서 제외한다.

## 10. 구현 순서와 컴포넌트 경계

확정된 구현 순서:

1. 기존 API 호출 패턴을 확인한다.
2. 기존 패턴이 Issue Docent 구조와 맞지 않으면 이번 작업에서 정리한다.
3. 공용 타입 디렉터리에 Issue Docent API 타입을 정의한다.
4. 목록/상세 API client를 만든다.
5. `/issue-docent` 목록 화면을 실제 API와 연결한다.
6. `/issue-docent/[id]` 상세 화면을 실제 API와 연결한다.
7. 원문 보기 모달, 용어 설명 모달, 퀴즈 상호작용을 연결한다.
8. 기존 `/mv` 더미 데이터 의존과 미사용 컴포넌트를 참조 확인 후 제거한다.

렌더링 경계:

- 목록/상세 데이터 fetch는 서버 컴포넌트에서 수행한다.
- 본문 렌더링, 원문 보기 모달, 용어 설명 모달, 퀴즈 선택 상태는 하나의 상세 클라이언트 컴포넌트가 관리한다.
- 기존 모달/다이얼로그 컴포넌트가 있으면 재사용하고, 없으면 원문 보기와 용어 설명이 공유하는 최소 공통 모달을 만든다.
- 새 UI 라이브러리는 도입하지 않는다.

상태 처리:

- 목록은 로딩, 에러, 빈 목록 상태를 가진다.
- 상세는 로딩, 에러, 찾을 수 없음 상태를 가진다.
- API base URL은 기존 `NEXT_PUBLIC_API_BASE_URL`을 그대로 사용한다.
- Issue Docent 목록/상세 fetch는 현재 MVP와 디버깅 편의성을 위해 `cache: "no-store"`로 호출한다.
- 이후 사용자 경험과 비용 효율성이 더 중요해지는 단계에서는 `revalidate`, SWR 계열 클라이언트 캐시, 또는 태그 기반 재검증을 검토할 수 있다.
- `created_at`, `published_date` 표시 문자열은 프론트에서 생성한다.
- `sector_companies` 백엔드 확장과 테스트는 완료된 것으로 보고 프론트 연결을 시작한다.

## 11. 후속 작업

1. `docs/API_SPEC.md`를 위 결정에 맞게 다시 작성한다.
2. 백엔드 Issue Docent에 `quizzes JSONB NOT NULL DEFAULT '[]'` 저장 구조와 퀴즈 생성 단계를 추가한다. 완료.
3. Issue Docent 상세 API 응답에 `quizzes`를 포함한다. 완료.
4. 로그인/유저 API 코드와 프론트 호출 경로를 `/api/v1` 기준으로 맞춘다.
5. 프론트 `/mv` 라우트와 컴포넌트를 `/issue-docent` 기준으로 정리한다.
6. 구현 후 `npm run lint`, `npm run typecheck`, `npm run build`, 로컬 브라우저 스모크 테스트를 실행한다.

## 12. 진행도와 남은 항목

프론트/API 소비 구조에 대한 grill-me는 핵심 구현 범위 기준으로 완료했다.

진행도:

```text
프론트 Issue Docent 소비 구조: 완료
프론트 Issue Docent API 연결: 완료
프론트 /mv 제거 및 /issue-docent 전환: 완료
백엔드 Issue Docent/퀴즈 API 기본 구조: 완료
백엔드 sector_companies projection 확장: 완료
auth/user prefix 정리: 완료
market indices API: 남음
```

| 항목 | 현재 확정된 부분 | 미정인 부분 |
|---|---|---|
| 원문 보기 UI | 상세 헤더 영역의 `원문 보기` 버튼으로 중앙 모달을 연다. 상세 API의 `articles`만 사용한다 | 없음 |
| 용어 설명 UI | 본문 내 용어 클릭 시 중앙 모달을 연다. 상세 API의 `matched_terms`만 사용한다 | 없음 |
| 라우트 전환 | `/mv`는 `/issue-docent`로 전환하고 redirect는 남기지 않는다 | 없음 |
| 퀴즈 UI | 본문 아래에 배치하고 선택 즉시 정답/오답과 해설을 표시한다 | 없음 |
| 피드 UI | 카드 전체 클릭으로 상세 이동. 필터/정렬 UI 없음 | 없음 |
| 카드 메타 계층 | `sector_companies` projection으로 섹터 아래 종목 표시 | 없음 |
| 메타 응답 구조 | `company_names`, `sectors` 제거 후 `sector_companies`로 완전 대체 | 없음 |
| projection 실패 처리 | 매칭 실패/중복 매칭은 null 메타로 보존, null 섹터는 하나의 그룹 | 없음 |
| projection 표시명 | 매칭 성공 시 `krx_name`, 실패 시 원본 추출 문자열 | 없음 |
| projection 실행 순서 | 백엔드 확장 후 프론트 구현 시작 | 없음 |
| projection 테스트 | unit, API, integration 모두 완료 | 없음 |
| 구현 순서 | API 타입/client 정리 후 목록/상세 UI 연결 | 없음 |
| 렌더링 경계 | 서버 컴포넌트 fetch + 단일 상세 클라이언트 컴포넌트 | 없음 |
| 공통 모달 | 기존 컴포넌트가 있으면 재사용, 없으면 최소 공통 모달 생성 | 없음 |
| 기존 더미 데이터 | `/mv` 의존 제거 후 미사용 파일 삭제 | 없음 |
| 상태 처리 | 목록 로딩/에러/빈 상태, 상세 로딩/에러/404 상태 | 없음 |
| API base URL | `NEXT_PUBLIC_API_BASE_URL` 사용 | 없음 |
| API fetch cache | MVP에서는 목록/상세 모두 `cache: "no-store"` 사용 | 운영 UX/비용 효율 최적화 시 `revalidate`, SWR, tag 재검증 검토 |
| 날짜 표시 | API는 ISO 문자열 유지, 프론트에서 표시 포맷 적용 | 없음 |
| 퀴즈 UI 상태 | 클라이언트 state로 관리. 선택 즉시 정답/오답과 해설 표시. 선택 후 변경 가능 | 향후 학습 기록/오답 저장 필요 시 persistence 방식 |
| auth/user prefix | API 계약, 프론트 호출, `jangdokdae-server` 라우터 prefix를 `/api/v1` 기준으로 맞춘다 | OAuth provider 콘솔 redirect URI 반영 여부 |
| market indices | `/api/v1/market/indices` 계약만 문서화 | 백엔드 구현 시점과 데이터 소스 |
| 회사/섹터 독립 API | 향후 검색/관심 설정 기능에서 `company_master` 기반 별도 API 설계 | 구체 경로와 스키마 |

## 13. 구현 전 검증 범위

Issue Docent 프론트 API 연동 구현 후 다음을 확인한다.

```bash
npm run lint
npm run typecheck
npm run build
```

로컬 백엔드와 프론트엔드를 함께 실행한 뒤 브라우저에서 다음을 확인한다.

- `/issue-docent` 목록 API 연결
- `/issue-docent/[id]` 상세 API 연결
- 원문 보기 모달
- 용어 설명 모달
- 퀴즈 선택, 정답/오답, 해설 표시

`auth/user` prefix 정리는 프론트 호출과 `jangdokdae-server` 라우터 기준으로 완료했다. 실제 OAuth 로그인 검증 시에는 Kakao/Google provider 콘솔의 redirect URI도 `/api/v1/auth/{provider}/callback` 기준으로 등록되어 있어야 한다.
