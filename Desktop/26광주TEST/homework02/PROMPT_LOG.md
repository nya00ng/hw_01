# Todo 앱 작업 프롬프트 기록

이 문서는 이번 대화에서 사용자 요청(프롬프트) 내용을 순서대로 정리한 기록입니다.

## 1) 초기 설계 요청

- HTML, CSS, JavaScript로 기본 Todo 앱 제작
- 코드 작성 전 전체 구현 구조 설계 요청
- 필수 기능 8가지 기준 제시:
  1. Todo 입력
  2. Todo 추가
  3. 빈 값 방지
  4. Todo 목록 표시
  5. 완료/미완료 변경
  6. Todo 삭제
  7. 추가·완료·삭제 후 화면 갱신
  8. 기본 UI 구성
- 조건:
  - 초보자 이해 가능한 설명
  - HTML/CSS/JS 역할 분리
  - 필요한 DOM 요소 정리
  - `todos` 배열 필요성 설명
  - 핵심 함수(`addTodo`, `renderTodos`, `toggleTodo`, `deleteTodo`) 중심 설계
  - `localStorage`, 검색, 필터, 수정 기능 제외
  - 파일은 `index.html` 하나 기준

## 2) 1단계 요청 (HTML 구조)

- `index.html` 하나로 기본 화면 구조 작성
- JavaScript 기능은 작성하지 않기
- 요소: 제목, 입력창, 추가 버튼, Todo 목록 `ul`
- CSS는 기본 카드형 UI
- 초보자용 주석 포함

## 3) 구조 보완 요청

- 기본 화면 구조에 아래 영역 필요하다고 명시:
  - `header`(제목 영역)
  - `input area`(입력창 및 추가 버튼)
  - `todolist` 출력 영역
  - 그 안의 `todo item`(개별 할 일 및 버튼)
  - `status area`(상태 및 개수 표시)

## 4) 파일 분리 + 2단계 요청 (DOM 선택)

- 파일을 `html`, `css`, `js`로 분리
- 2단계는 JavaScript에서 DOM 요소 선택 코드만 작성
- 현재 화면 요소:
  1. input
  2. 추가 button
  3. Todo 목록 영역
- 조건:
  - 기존 HTML/CSS 구조 최대 유지
  - 변수명 쉽게(`todoInput`, `addButton`, `todoList`)
  - 각 변수 주석 설명

## 5) 3단계 요청 (`todos` 배열)

- 기능 구현 없이 할 일 데이터를 저장할 배열만 추가
- 조건:
  - 기존 HTML/CSS/DOM 선택 코드 유지
  - `todos` 배열 생성
  - 연습용 2개 데이터 삽입
  - 각 항목 구조: `id`, `text`, `isDone`
  - `console.log`로 확인
  - 추가/렌더/완료/삭제 기능은 아직 금지

## 6) 4단계 요청 (`addTodo`만)

- 목표: 입력값을 `todos`에 추가
- 조건:
  - 기존 코드 유지
  - `addTodo` 함수 작성
  - `trim()` 적용
  - 빈 값은 `alert("할 일을 입력해주세요.")`
  - 유효값은 `{ id: Date.now(), text, isDone: false }` 객체 생성 후 `push`
  - 입력창 비우기
  - 추가 버튼 클릭 시 실행
  - `renderTodos`는 아직 금지
  - `console.log(todos)`로 확인
  - 쉬운 주석

## 7) 5단계 요청 (`renderTodos`만)

- 목표: 목록 화면 출력
- 조건:
  - 기존 코드 유지
  - `renderTodos` 함수 작성
  - `ul.innerHTML = ""`로 초기화
  - `todos.forEach`로 `li` 생성
  - `todo.text` 표시
  - `isDone === true`면 취소선
  - 페이지 로드시 `renderTodos()` 1회 실행
  - `addTodo` 후 `renderTodos()` 실행
  - 완료/삭제 기능은 아직 금지

## 8) 6단계 요청 (완료/미완료 토글)

- 목표: 완료 상태 변경
- 조건:
  - 기존 코드 유지
  - `toggleTodo(id)` 작성
  - `id`로 대상 todo 찾아 `isDone` 반전
  - 변경 후 `renderTodos()` 호출
  - `renderTodos`에서 완료 버튼 생성
  - 버튼 클릭 시 `toggleTodo(todo.id)` 실행
  - 버튼 글자: 미완료 `"완료"`, 완료 `"취소"`
  - 완료된 todo는 취소선
  - 삭제 기능은 아직 금지

## 9) 7단계 요청 (삭제 기능)

- 목표: 삭제 기능만 구현
- 조건:
  - 기존 코드 유지
  - `deleteTodo(id)` 작성
  - `filter`로 해당 id 제외
  - 삭제 후 `renderTodos()`
  - `renderTodos`에서 삭제 버튼 생성
  - 버튼 클릭 시 `deleteTodo(todo.id)`
  - 버튼 글자 `"삭제"`
  - 배열 재할당 위해 `todos`가 `const`면 `let`으로 변경
  - 쉬운 주석

## 10) 8단계 요청 (전체 기능 점검)

- 목표: 기능 추가가 아니라 안정성 확인
- 점검 항목: 필수 기능 8가지
- 조건:
  - 기존 코드 유지
  - `localStorage`, 수정, 검색, 필터 기능 추가 금지
  - 필수 기능만 안정 동작하게 정리
  - 초보자용 주석 보완
  - 어렵다면 쉬운 방식으로 정리

## 11) 제출 전 최종 점검 요청

- 필수 8기능 정상 동작 확인
- 오류 있으면 수정
- 불필요한 기능 추가 금지
- `localStorage`, 수정, 검색, 필터 추가 금지
- 초보자 기준으로 단순하게 정리
- HTML/CSS/JS 주석 간단 보완
- `index.html` 실행만으로 동작 가능해야 함

## 12) Tailwind UI 변경 요청

- 기능은 완료, 이제 UI만 수정
- Tailwind CSS CDN 적용
- 깔끔한 카드형 Todo UI
- 테스트용 기본 Todo 2개 제거
- 첫 화면은 빈 목록
- 사용자 입력으로 추가될 때만 목록 표시
- 기존 JavaScript 기능 최대 유지

## 13) 최종 UI 상세 변경 요청

- 기존 JS 기능 유지 + 화면 표현 개선
- 변경 목표:
  1. 완료/취소 텍스트 버튼 제거, 체크박스로 변경
  2. 체크 해제 = 미완료
  3. 체크 = 완료
  4. 체크박스 클릭 시 기존 `toggleTodo` 실행
  5. 완료 텍스트에 취소선 + 흐린 색상
  6. 삭제 텍스트 버튼 제거, 휴지통 아이콘 버튼 사용
  7. 휴지통 버튼 클릭 시 기존 `deleteTodo` 실행
- 스타일 요청:
  - Tailwind CDN 사용
  - 연한 회색 배경
  - 중앙 카드
  - 카드 내부: 제목, 입력창, 추가 버튼, 목록, 하단 통계
  - 각 Todo 한 줄 구조: `[체크박스] [텍스트] [휴지통]`
  - 간격 정렬 개선
  - 입력창/추가 버튼 디자인 개선
  - 모바일 반응형
- 추가 요청:
  - 테스트 데이터 제거
  - 초기 목록 비어있게
  - 사용자 추가 데이터만 표시
- 아이콘:
  - 휴지통 모양
  - inline SVG 또는 아이콘 CDN
  - 무거운 라이브러리 추가 금지
- 중요:
  - `addTodo`, `renderTodos`, `toggleTodo`, `deleteTodo` 유지
  - `localStorage`, 검색, 필터, 수정 기능 추가 금지
  - `index.html` 실행 구조 유지
  - 초보자용 간단 주석

## 14) 현재 요청

- 지금까지 프롬프트 내용을 MD 파일로 기록 요청

