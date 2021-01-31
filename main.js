const form = document.querySelector(".add-item-form");
const list = document.querySelector(".list")

let state = [];

function handleSubmit(e) {
  e.preventDefault();
  const text = e.target.item.value;
  if(text === ''){
    return;
  }
  
  const item = {
    text,
    id: Date.now(),
    complete: false
  };
  state.push(item);
  e.target.reset();
  list.dispatchEvent(new CustomEvent('updateApp'));
}

function drawList () {
  const html = state.map((elem) => `
  <li>
  <input type="checkbox" value="${elem.id}" ${elem.complete && 'checked'}>
  <span class="itemName">${elem.text}</span>
  <button value="${elem.id}">&times;</button>
  </li>
  `).join('');
  list.innerHTML = html;
}

function removeItem(id){
  state = state.filter((elem) => elem.id !== id);
  list.dispatchEvent(new CustomEvent('updateApp'));
} 

function updateLocalStorage() {
  localStorage.setItem('state', JSON.stringify(state));
}

function markItem(id) {
  const elem = state.find((elem) => elem.id === id);
  elem.complete = !elem.complete;
  list.dispatchEvent(new CustomEvent('updateApp'));
}

function restoreFromLocalStorage() {
  const el = JSON.parse(localStorage.getItem('state'));
  state.push(...el);
  list.dispatchEvent(new CustomEvent('updateApp'));
}

form.addEventListener('submit', handleSubmit);
list.addEventListener('updateApp', drawList);
list.addEventListener('updateApp', updateLocalStorage)
list.addEventListener('click', (e) => {
  const id = +e.target.value;
  if (e.target.closest('button')) {
    removeItem(id);
  }
  if (e.target.closest('[type="checkbox"]')) {
    markItem(id);
  }

})
restoreFromLocalStorage();