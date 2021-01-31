const form = document.querySelector(".add-item-form");
const list = document.querySelector(".list")

const state = [];

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
  <input type="checkbox" value="${elem.id}">
  <span class="itemName">${elem.text}</span>
  <button value="${elem.id}">&times;</button>
  </li>
  `).join('');
  list.innerHTML = html;
}

form.addEventListener('submit', handleSubmit);
list.addEventListener('updateApp', drawList);