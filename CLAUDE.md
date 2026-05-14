# 작업 규칙

이 문서는 AI 코딩 도구가 달라도 동일한 개발 기준을 따르기 위한 팀 공통 작업 규칙입니다.

`AGENTS.md`와 `CLAUDE.md`는 같은 내용을 유지합니다.

## 작업 전 확인

새 파일을 만들거나 구조를 변경하기 전에는 기존 코드와 문서를 먼저 확인합니다.

- 새 파일을 만들기 전에 같은 역할을 하는 파일이나 유사한 패턴이 있는지 확인합니다.
- API 연동 작업 전에는 `docs/API_SPEC.md`를 확인합니다.
- UI/스타일 작업 전에는 `docs/DESIGN.md`를 확인합니다.
- 기존 컴포넌트, 훅, 유틸, 타입을 우선 재사용합니다.
- 단순 구현을 위해 불필요한 새 구조를 만들지 않습니다.
- 요청 범위를 벗어난 리팩토링은 하지 않습니다.
- 큰 구조 변경이 필요하면 먼저 변경 이유와 범위를 정리합니다.

## 레포 구조

- `src/app`: Next.js App Router 페이지와 레이아웃
- `src/components`: 재사용 컴포넌트
- `src/hooks`: custom hooks
- `src/lib`: API client, data mapping, utility
- `src/types`: 공통 타입
- `src/constants`: 상수
- `docs`: 프로젝트 문서
- `public/images`: 이미지
- `public/videos`: 비디오
- `docs/API_SPEC.md`: API 명세
- `docs/DESIGN.md`: 전체 디자인 기준

## 파일명 작성 규칙

파일명은 먼저 책임과 도메인이 드러나야 하며, 그 다음 표기 규칙을 적용합니다.

- React 컴포넌트 파일은 `PascalCase`를 사용합니다.
  - 예: `AuthHeader.tsx`
- custom hook 파일은 `use`로 시작하고 `camelCase`를 사용합니다.
  - 예: `useInterestProfile.tsx`
- 일반 TypeScript 파일은 lowercase 단일어 또는 `camelCase`를 사용합니다.
  - 단일어: `api.ts`, `utils.ts`, `companies.ts`
  - 복합어: `jangdokdaeData.ts`, `issueDocent.ts`
- Next.js App Router 예약 파일은 Next.js 규칙을 따릅니다.
  - 예: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- shadcn/ui 또는 외부 CLI가 생성한 primitive 파일은 생성 도구의 관례를 따릅니다.
  - 예: `button.tsx`
- 의미 없는 임시 파일명은 사용하지 않습니다.
  - 금지: `temp.ts`, `new.tsx`, `final.tsx`, `component.tsx`, `section.tsx`

기존 임시 파일은 관련 리팩토링을 진행할 때 점진적으로 정리합니다.

## API 연동 규칙

API 연동 전에는 `docs/API_SPEC.md`를 먼저 확인합니다.

- API 응답 타입은 `src/types`에 둡니다.
- API 호출과 응답 변환은 `src/lib`에서 관리합니다.
- 컴포넌트 안에서 fetch 응답 구조를 직접 해석하지 않습니다.
- API 명세와 실제 구현이 다르면 먼저 문서를 업데이트하거나 확인합니다.
- 더미 데이터와 실제 API 타입이 섞이지 않도록 주의합니다.

## 스타일링 기준

UI/스타일 작업 전에는 `docs/DESIGN.md`를 먼저 확인합니다.

현재 컴포넌트 스타일 규칙은 고정하지 않습니다. 디자인 방향이 변경될 수 있으므로, 새로운 스타일 규칙이나 디자인 토큰을 임의로 확정하지 않습니다.

## 검증 규칙

작업 성격에 따라 다음 명령을 실행합니다.

- 문서만 수정한 경우: 검증 생략 가능
- TypeScript, React, CSS 변경: `npm run lint`와 `npm run typecheck`
- 라우팅, Next.js 설정, 패키지, 빌드 영향 변경: `npm run check`
- 작업 완료 전에는 가능한 경우 `npm run check` 실행을 권장합니다.

## Git 컨벤션

커밋 메시지는 다음 타입을 사용합니다.

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `docs`: 문서 수정
- `test`: 테스트 추가/수정
- `chore`: 빌드, 패키지 설정, 기타 작업

예:

- `feat: 이슈 도슨트 피드 추가`
- `fix: 용어 툴팁 위치 오류 수정`
- `refactor: 데모 데이터 모듈 이름 정리`
- `docs: API 명세 업데이트`
- `test: 이슈 상세 렌더링 테스트 추가`
- `chore: 의존성 업데이트`
