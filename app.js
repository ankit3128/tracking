const express =require('express')
const app =express();
////// requiring the socket io
const http =require("http");
const socketio=require("socket.io");
const server=http.createServer(app);
const io =socketio(server);
const path =require("path")

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))

// to handle io request 
io.on("connection",function (socket){
    console.log("connected")
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id, ...data})
    })
})


app.get("/",(req,res)=>{
    res.render("index")
})
server.listen(3000,() => {
  console.log("server is listening to port 3000");
});
// we can use server.listeninsted of app.listen
