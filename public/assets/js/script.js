const sendBtn = document.querySelector("#send");
const chatBox = document.querySelector("#chatbox");
const ul = document.querySelector("ul");
const userName = document.querySelector('#username');
const socket = io();

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
