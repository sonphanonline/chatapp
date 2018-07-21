const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('a user connected')

    socket.on('chat message', msg => {
        console.log(msg)
        if(msg.indexOf('1') !== -1){
            io.emit('chat message', 'server : ' + msg)
        }
        else{
            socket.emit('chat message', 'your message: ' + msg)
        }
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(3000,()=>{
    console.log('The server is running: http://localhost:3000')
})
