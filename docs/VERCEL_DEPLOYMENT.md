# Vercel 프론트엔드 배포 가이드

이 문서만 따라 하면 장독대 프론트엔드를 Vercel에 배포할 수 있습니다.

## 1. 새 프로젝트 만들기

1. Vercel Dashboard에 접속합니다.
2. **Add New... → Project**를 선택합니다.
3. 장독대 프론트엔드 저장소를 선택합니다.
4. **Import**를 누릅니다.

## 2. Configure Project 화면 입력

### Framework Preset

| 항목 | 값 |
|---|---|
| Framework Preset | `Next.js` |

### Root Directory

| 배포 방식 | 입력 값 |
|---|---|
| 프론트엔드 저장소만 연결한 경우 | 비워 둠 |
| 상위 저장소 전체를 연결한 경우 | `jangdokdae-client` |

### Build and Output Settings

`Next.js`로 자동 감지되면 기본값을 그대로 사용합니다.

| 항목 | 값 |
|---|---|
| Build Command | `npm run build` |
| Output Directory | 기본값 |
| Install Command | `npm install` |

### Environment Variables

아래 값을 추가합니다.

| 이름 | 값 | 적용 환경 |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `https://jangdokdae-server.onrender.com` | `Production`, `Preview` |
| `NEXT_PUBLIC_APP_ENV` | `production` | 선택 |

## 3. 배포 실행

1. **Deploy**를 누릅니다.
2. 배포가 끝날 때까지 기다립니다.
3. 생성된 Vercel URL을 엽니다.

## 4. 배포 후 확인

아래 항목만 확인합니다.

- 현재 운영 URL: `https://jangdokdae-client.vercel.app/`
- 메인 화면이 열리는지
- `/issue-docent` 페이지가 열리는지
- API 호출이 정상 동작하는지
- `NEXT_PUBLIC_API_BASE_URL`이 Render 백엔드 주소로 연결되어 있는지

백엔드 배포와 운영 방법은 별도 Render 배포 문서를 참고합니다.

## 5. 이후 배포

- 브랜치 push: Preview Deployment 생성
- 운영 브랜치 반영: Production Deployment 생성
- 환경 변수를 바꾼 경우: 새 배포를 다시 실행
