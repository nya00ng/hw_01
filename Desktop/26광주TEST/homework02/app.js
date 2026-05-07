// 할 일을 입력하는 input 요소를 선택합니다.
const todoInput = document.getElementById("todoInput");

// 할 일을 추가할 때 누르는 버튼 요소를 선택합니다.
const addButton = document.getElementById("addButton");

// Todo 항목들이 표시될 ul 목록 영역 요소를 선택합니다.
const todoList = document.getElementById("todoList");

// Todo 상태(총 개수/완료 개수)를 보여줄 요소를 선택합니다.
const statusText = document.getElementById("statusText");

// localStorage에 저장할 때 사용할 키 이름입니다.
const STORAGE_KEY = "todoAppData";

// Todo 데이터를 저장하는 배열입니다. 처음에는 빈 배열로 시작합니다.
let todos = [];

// 현재 todos 배열을 localStorage에 저장합니다.
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// localStorage에 저장된 Todo 데이터를 불러옵니다.
function loadTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  // 저장된 데이터가 없으면 빈 배열을 유지합니다.
  if (!savedTodos) {
    todos = [];
    return;
  }

  // 문자열 데이터를 배열로 변환해서 todos에 넣습니다.
  todos = JSON.parse(savedTodos);
}

// 입력창의 값을 읽어서 todos 배열에 새 할 일을 추가하는 함수입니다.
function addTodo() {
  // 입력한 값을 가져오고, 앞뒤 공백을 제거합니다.
  const inputText = todoInput.value.trim();

  // 빈 값이면 경고를 보여주고 함수 실행을 중단합니다.
  if (inputText === "") {
    alert("할 일을 입력해주세요.");
    return;
  }

  // 새 할 일 객체를 만듭니다.
  const newTodo = {
    id: Date.now(),
    text: inputText,
    isDone: false,
  };

  // 만든 객체를 todos 배열에 추가합니다.
  todos.push(newTodo);

  // 변경된 배열을 localStorage에 저장합니다.
  saveTodos();

  // 목록을 다시 그려서 화면에 최신 상태를 반영합니다.
  renderTodos();

  // 입력창을 비워서 다음 할 일을 입력할 수 있게 합니다.
  todoInput.value = "";
}

// id가 같은 Todo를 찾아서 완료/미완료 상태를 바꾸는 함수입니다.
function toggleTodo(id) {
  // 배열에서 id가 같은 Todo를 찾습니다.
  const targetTodo = todos.find((todo) => todo.id === id);

  // 찾은 Todo가 있으면 isDone 값을 반대로 바꿉니다.
  if (targetTodo) {
    targetTodo.isDone = !targetTodo.isDone;
  }

  // 변경된 배열을 localStorage에 저장합니다.
  saveTodos();

  // 변경된 내용을 화면에 다시 보여줍니다.
  renderTodos();
}

// id가 같은 Todo를 배열에서 제거하는 함수입니다.
function deleteTodo(id) {
  // 삭제할 id를 제외한 Todo만 남겨서 배열을 다시 만듭니다.
  todos = todos.filter((todo) => todo.id !== id);

  // 변경된 배열을 localStorage에 저장합니다.
  saveTodos();

  // 변경된 목록을 화면에 다시 보여줍니다.
  renderTodos();
}

// todos 배열을 기준으로 Todo 목록을 화면에 그리는 함수입니다.
function renderTodos() {
  // 기존 목록을 먼저 비워서 중복 출력되지 않게 합니다.
  todoList.innerHTML = "";

  // todos 배열을 하나씩 반복하면서 li를 만듭니다.
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.className =
      "flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0";

    // 체크박스를 만들고 체크 상태를 isDone 값과 연결합니다.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isDone;
    checkbox.className =
      "h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500";
    checkbox.addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    todoText.className = "flex-1 text-sm";

    // 완료된 항목이면 취소선 + 흐린 색상을 적용합니다.
    if (todo.isDone === true) {
      todoText.classList.add("line-through", "text-slate-400");
    }

    // 삭제 버튼(휴지통 아이콘)을 만들고 클릭 시 deleteTodo를 실행합니다.
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className =
      "rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-rose-500";
    deleteButton.setAttribute("aria-label", "할 일 삭제");
    deleteButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';
    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    // li 안에 [체크박스] [텍스트] [삭제 아이콘] 순서로 넣습니다.
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);

    // 만든 li를 ul에 추가합니다.
    todoList.appendChild(todoItem);
  });

  // 현재 Todo 상태를 계산해서 상태 영역에 보여줍니다.
  const doneCount = todos.filter((todo) => todo.isDone).length;
  statusText.textContent = `총 ${todos.length}개 / 완료 ${doneCount}개`;
}

// 추가 버튼을 클릭하면 addTodo 함수가 실행됩니다.
addButton.addEventListener("click", addTodo);

// 페이지가 열릴 때 localStorage 데이터를 불러오고 목록을 보여줍니다.
loadTodos();
renderTodos();
