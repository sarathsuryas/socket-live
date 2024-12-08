const {Server} = require('socket.io')
const express = require('express')
const http = require('http')
const app = express()

app.set('view engine','ejs')
app.get('/',(req,res)=>{
  res.render('stream')
})
app.get('/get',(req,res)=>{
  res.render('view')
})
const server = http.createServer(app).listen(3000,()=>{
  console.log('http://localhost:3000')
  console.log('http://localhost:3000/get')
})
const io = new Server(server, { cors: {
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['my-custom-header'],
  credentials: true,
}})   
  
io.on('connection',(socket)=>{
   console.log(`connection established with ${socket.id}` )
   socket.on('stream',(data)=>{
    socket.emit('chunks',data)
   })
}) 
  
      