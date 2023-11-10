
import http from "http"
import express from "express"
import { Server } from "socket.io";
import format from "date-fns/format/index.js";
import parseISO from "date-fns/parseISO/index.js";


const host = "127.0.0.1";
const port = 8000;
const app = express();
const server = http.Server(app)
const io = new Server(server)
io.listen(port)
const img = "";
let messages = []


app.use(express.static("public"))
app.get("/", function (req, res) {
  res.sendFile("/index.html",{root:__dirname})
});
io.on("connection",(socket) => {
    socket.broadcast.emit("users",{"userId":socket.id})
    socket.on("message",(data) => {
        messages.push(data)
        /* console.dir(socket); */
        console.dir(data.date);
        data.date = format(parseISO(data.date),'MM/dd/yyyy H:mm')
        console.dir(data);
        console.dir(messages);
        socket.broadcast.emit("resMessage",{"chats":messages})
    })
})


server.listen(port,host,() => {
    console.log(`Serveur lancé sur l'addresse : http://${host}:${port}`);
})

