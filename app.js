const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
io.origins("*:*");

const SERVER_HOST = "localhost";
const SERVER_PORT = process.env.PORT || 8080;

let messages = []

let hour = new Date()
let minute = new Date()

app.get("/", (req,res)=>{
  res.send("Api")
})

io.on("connection", (socket) => {
  socket.on("chat message", ({ id, message }) => {
    let hour = new Date()
    let minute = new Date()
    
    messages.push(message)
    io.emit("chat message", {
      id,
      messages,
      hour: (hour.getHours() < 10 ? `0${hour.getHours() - 3}` : hour.getHours() - 3),
      minute: (minute.getMinutes() < 10 ? `0${minute.getMinutes()}` : minute.getMinutes()), 
    });
  });
  socket.on("disconnect", () => {

  });
});

http.listen(SERVER_PORT);
