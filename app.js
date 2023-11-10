
import http from "http"
import express from "express"
import { Server } from "socket.io";

const host = "127.0.0.1";
const port = 8000;
const app = express();
const server = http.Server(app)
const io = new Server(server)
io.listen(port)
const img = "";


app.use(express.static("public"))
app.get("/", function (req, res) {
  res.sendFile("/index.html",{root:__dirname})
});
io.on("connection",(socket) => {
    socket.on("message",(data) => {
        console.dir(socket);
        console.dir(data);
        socket.broadcast.emit("resMessage",{"data":data})
    })
})


server.listen(port,host,() => {
    console.log(`Serveur lancé sur l'addresse : http://${host}:${port}`);
})

