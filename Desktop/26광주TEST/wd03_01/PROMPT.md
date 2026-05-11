# PROMPT 기록

## 작업 목적
- GitHub REST API 저장소 검색 URL을 조건에 맞게 구성하고, 초보자도 확인 가능한 형태로 정리한다.
- 결과를 확인할 수 있는 HTML 화면을 만들고, 진행 내역을 문서로 남긴다.

## 사용자 요청 흐름
1. 저장소 검색 URL 조건 제시
   - 검색어: `keyword`
   - API: `search/repositories`
   - 정렬: `stars`
   - 순서: `desc`
   - 개수: `6`
2. `fetch`에서 쓸 수 있는 URL 예시 요청
3. JavaScript 함수 + template literal 형태로 재작성 요청
4. 초보자 이해를 위한 주석 추가 요청
5. 확인 가능한 HTML 화면 생성 요청
6. 진행 내용을 문서화하고 GitHub에 기록 요청

## 구현 및 반영 내용
- `index.html` 생성
  - `keyword` 입력 UI 제공
  - 버튼 클릭 시 URL 생성 결과 표시
  - `encodeURIComponent(keyword)` 적용
  - URL 파라미터 고정:
    - `sort=stars`
    - `order=desc`
    - `per_page=6`
- 본 문서(`PROMPT.md`) 작성으로 진행 이력 기록

## 핵심 URL 규칙
아래 형식으로 URL을 생성한다.

`https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}&sort=stars&order=desc&per_page=6`

## 결과
- 화면 확인 파일: `wd03_01/index.html`
- 기록 문서 파일: `wd03_01/PROMPT.md`
