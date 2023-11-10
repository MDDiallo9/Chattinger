const sendBtn = document.querySelector("#send");
const chatBox = document.querySelector("#chatbox");
const ul = document.querySelector("ul");
const usersList = document.querySelector('#users-list');
const userName = document.querySelector('#username');
const socket = io();
const form = document.querySelector('form')
const dialog = document.querySelector("dialog")

// Username modal
dialog.showModal()

form.addEventListener("submit",(e) => {
  e.preventDefault()
  let msg = chatBox.value;
  chatBox.value = "";
  const li = document.createElement("li");
  li.textContent = ` ${msg}`;
  ul.append(li);
  socket.emit("message", { message: msg, date: Date.now()});
})

sendBtn.addEventListener("click", (e) => {
  let msg = chatBox.value;
  chatBox.value = "";
  const li = document.createElement("li");
  li.textContent = ` ${msg}`;
  ul.append(li);
  socket.emit("message", { message: msg, date: Date.now()});
});

socket.on("resMessage", (data) => {
  /* ul.append(data) */
  console.log(data);
  const li = document.createElement("li");
  li.textContent = `${data.data.message}`;
  ul.append(li);
});
socket.on("users",(data) => {
  const li = document.createElement('li');
  li.textContent = data.userId
  usersList.append(li)
  const joinMsg = document.createElement("li")
  joinMsg.textContent = `${date.userId} a rejoint le stage`
  ul.append(joinMsg)
})

