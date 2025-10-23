import { el, empty } from "./elements.js";

/**
 * Breytir stöðu atriðis í lista. Ef kláruð atriði eru sýnd er það sýnt, annars er það falið um leið og það er klárað.
 * @param {HTMLElement} item
 * @param {boolean} isShown `true` ef kláruð atriði eru sýnileg, annars `false`.
 * @returns {void}
 */
export function toggleTodoItemStatus(item, isShown = true) {
  const checkbox = item.querySelector('input[type="checkbox"]');
  
  if (checkbox.checked) {
    item.classList.add("finished");
    if (!isShown) {
      item.classList.add("hidden");
    } else {
      item.classList.remove("hidden");
    }
  } else {
    item.classList.remove("finished");
    item.classList.remove("hidden");
  }

  const list = item.closest(".todo-list");
  updateStats(list);
  checkListState(list);
}

/**
 * Fjarlægja atriði (sem DOM element) úr lista.
 * @param {HTMLElement} item
 * @returns {void}
 */
export function removeTodoItem(item) {
  const list = item.closest(".todo-list");
  item.remove();
  updateStats(list);
  checkListState(list);
}

/**
 * Breytir sýnileika kláraðra atriða í lista.
 * @param {HTMLElement} todolist
 * @return {boolean} `true` if finished items are shown, `false` if hidden
 */
export function toggleFinished(todolist) {
  const button = todolist.querySelector(".toggle-finished");
  const showCompleted = button.textContent.includes("Sýna");

  const items = todolist.querySelectorAll("ul.list li");
  items.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      if (showCompleted) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    }
  });

  button.textContent = showCompleted
    ? "Fela kláruð atriði"
    : "Sýna kláruð atriði";

  updateStats(todolist);
  checkListState(todolist);
  return !showCompleted;
}

/**
 * Hreinsar allan lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function clearList(todolist) {
  const list = todolist.querySelector("ul.list");
  empty(list);
  updateStats(todolist);
  checkListState(todolist);
}

/**
 * Uppfærir upplýsingar um fjölda kláraðra og ókláraðra atriða í lista.
 * @param {Element | null} todoList
 * @return {void}
 */
export function updateStats(todoList) {
  if (!todoList) return;

  const items = todoList.querySelectorAll("ul.list li");
  const total = items.length;
  const completed = todoList.querySelectorAll("ul.list li input[type='checkbox']:checked").length;

  const completedEl = todoList.querySelector(".stats .finished");
  const uncompletedEl = todoList.querySelector(".stats .unfinished");

  if (completedEl && uncompletedEl) {
    completedEl.textContent = completed;
    uncompletedEl.textContent = total - completed;
  }
}

/**
 * Býr til nýtt atriði í lista með texta `text`.
 * @param {HTMLElement} todolist
 * @param {string} text
 * @return {void}
 */
export function createTodoItem(todolist, text) {
  const trimmed = text.trim();
  if (!trimmed || trimmed === '') return;

  const checkbox = el("input", { type: "checkbox" });
  const span = el("span", { class: "item" }, trimmed);
  const deleteButton = el("button", {}, "🗑️");
  const li = el("li", {}, checkbox, span, deleteButton);

  const ul = todolist.querySelector("ul.list");
  ul.appendChild(li);

  if (ul.classList.contains("hidden")) {
    ul.classList.remove("hidden");
  }

  checkbox.addEventListener("change", () => {
    const button = todolist.querySelector(".toggle-finished");
    const showCompleted = button ? !button.textContent.includes("Sýna") : true;
    toggleTodoItemStatus(li, showCompleted);
  });

  deleteButton.addEventListener("click", () => {
    removeTodoItem(li);
  });

  updateStats(todolist);
  checkListState(todolist);
}

/**
 * Athugar hvort listinn sé tómur og sýnir eða felur skilaboð um tóman lista.
 * @param {HTMLElement} todolist
 * @return {void}
 */
export function checkListState(todolist) {
  const emptyMessage = todolist.querySelector(".empty");
  const ul = todolist.querySelector("ul.list");
  const visibleItems = Array.from(ul.querySelectorAll("li:not(.hidden)"));

  if (visibleItems.length === 0) {
    emptyMessage.classList.remove("hidden");
    ul.classList.add("hidden");
  } else {
    emptyMessage.classList.add("hidden");
    ul.classList.remove("hidden");
  }
}
