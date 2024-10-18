const io=require('socket.io')(6000)

io.on('connected', (socket)=>{
    socket.on('send-message',(message)=>{
        socket.broadcast.emit('chat-message',message)
    })
})

// io.on('disconnected',(socket)=>{
//     socket.emit('disconnection-message','User Disconnected')
// })

// socket.io('send-message',(message)=>{
//     console.log(message);
//     io.emit('send-message',message)    
// })



