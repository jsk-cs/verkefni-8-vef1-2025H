/* TODO import á allt viðeigandi úr ./lib/todo.js */
import {
  createTodoItem,
  toggleFinished,
  clearList,
  updateStats,
  checkListState,
} from "./lib/todo.js";

/**
 * @param {HTMLElement} todolist
 */
function initialize(todolist) {
  const form = document.querySelector(".form");
  const textarea = document.querySelector(".form input[type=text]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = textarea.value.trim();
    if (text === "") {
      return;
    }
    createTodoItem(todoList, text);
    textarea.value = "";
    updateStats(todoList);
    checkListState(todoList);
  });
  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const text = textarea.value;
      if (text === "") {
        return;
      }
      createTodoItem(todoList, text);
      textarea.value = "";
      updateStats(todoList);
      checkListState(todoList);
      }
  });
  const toggleButton = document.querySelector(".toggle-finished");
  toggleButton.addEventListener("click", () => {
    toggleFinished(todolist);
  });
  const clearButton = document.querySelector(".clear-all");
  clearButton.addEventListener("click", () => {
    if(confirm("Ertu viss um að þú viljir hreinsa lista?")) {
      clearList(todolist);}
  });
  updateStats(todolist);
  checkListState(todolist); 
}

// Finnum todo lista og keyrum fall sem setur allt upp
const todoList = document.querySelector(".todo-list");

// Viljum vera viss um að todoList hafi fundist og sé HTMLElement
if (todoList && todoList instanceof HTMLElement) {
  initialize(todoList);
} else {
  console.error("no todo list found");
}
