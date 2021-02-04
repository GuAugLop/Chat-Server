const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
io.origins("*:*");

const SERVER_HOST = "localhost";
const SERVER_PORT = process.env.PORT || 8080;

app.get("/", (req,res)=>{
  res.send("Api")
})

io.on("connection", (socket) => {
  console.log("[IO] Connection => Server has a new connection");
  socket.on("chat message", ({ id, message }) => {
    console.log("[SOCKET] Chat.message => ", message);
    io.emit("chat message", {
      id,
      message,
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
    });
  });
  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnect => A connection was disconnected");
  });
});

http.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(
    `[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`
  );
  console.log("[HTTP] Listen => Press CTRL+C to stop it");
});
