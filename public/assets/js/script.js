const sendBtn = document.querySelector("#send");
const chatBox = document.querySelector("#chatbox");
const ul = document.querySelector("ul");
const usersList = document.querySelector('#users-list');
const userName = document.querySelector('#username');
const socket = io();
const form = document.querySelector('form')
const dialog = document.querySelector("dialog")

// Username modal
/* dialog.showModal() */
// Render chat history
const renderChats = (history) => {
  for (let chat of history){
    const li = document.createElement("li")
    li.innerHTML = `<div>${chat.message}<span>${chat.date}</span></div>`
    li.classList.add("message")
    ul.append(li)
  }
}
//
form.addEventListener("submit",(e) => {
  e.preventDefault()
  let msg = chatBox.value;
  chatBox.value = "";
  const li = document.createElement("li");
  li.textContent = ` ${msg}`;
  /* ul.append(li); */
  socket.emit("message", { message: msg, date: new Date()});
})

/* sendBtn.addEventListener("click", (e) => {
  let msg = chatBox.value;
  chatBox.value = "";
  const li = document.createElement("li");
  li.textContent = ` ${msg}`;
  ul.append(li);
  socket.emit("message", { message: msg, date: Date.now()});
}); */

socket.on("resMessage", (data) => {
  /* ul.append(data) */
  renderChats(data.chats)
});
socket.on("users",(data) => {
  const li = document.createElement('li');
  li.textContent = data.userId
  usersList.append(li)
  const joinMsg = document.createElement("li")
  joinMsg.textContent = `${data.userId} a rejoint le stage`
  ul.append(joinMsg)
})



