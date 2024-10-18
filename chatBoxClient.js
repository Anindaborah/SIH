const socket=require('http://localhost:6000')
const messageForm=document.getElementById('send-message')
const messageInput=document.getElementById('input-message')

messageForm.addEventListener('submit',(refresh)=>{
   refresh.preventDefault()
   const message=messageInput.value
   socket.emit('send-message-input',message)
   messageInput.value=''
})

