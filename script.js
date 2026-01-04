const inputEl = document.getElementById("inputEl");
const outputEl = document.getElementById("outputEl");
const addBtn = document.getElementById("addBtn");
const todos = JSON.parse(localStorage.getItem("todo")) || [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputEl.value) return;
  todos.push({ id: Date.now(), text: inputEl.value, completed: false });
  localStorage.setItem("todo", JSON.stringify(todos));
  clearInput();
  render();
});

function getHTML() {
  if (!todos.length) {
    return `<p>No todos added yet!</p>`;
  }

  return `
    <ul>${todos
      .map(
        (todo) =>
          `<li><button data-id="${todo.id}" class="btn">DONE</button><p>${todo.text}</p></li>`
      )
      .join("")}
    </ul>
    `;
}

function render() {
  outputEl.innerHTML = getHTML();
  console.log(getHTML());
}

function clearInput() {
  if (!inputEl.value) return;
  inputEl.value = "";
}

outputEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;
  const id = parseInt(e.target.dataset.id); // get the id from data-id
  const todoIndex = todos.findIndex((todo) => todo.id === id); // find index in array
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
    render();
  }
});

render();
