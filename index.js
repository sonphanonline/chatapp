const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const clients = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('a user connected: ' + socket.id)

    clients.push({ id: socket.id, socket: socket })

    io.emit('clients list', clients.map(x=>x.id))

    // socket.on('chat message', msg => {
    //     console.log(msg)

    //     toId = msg.substring(0,32);

    //     if (msg.indexOf('1') !== -1) {
    //         io.emit('chat message', 'server : ' + msg)
    //     }
    //     else {
    //         socket.emit('chat message', 'your message: ' + msg)
    //     }
    // })

    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
        index = 0;
        for (index = 0; index < clients.length; index++) {
            console.log(clients[index].id)
            if (clients[index].id === socket.id) {
                console.log('removed: ' + socket.id)
                clients.slice(index,1)
                break
            }
        }

        clients.map(x=>console.log(x.id))
    })
})

server.listen(3000, () => {
    console.log('The server is running: http://localhost:3000')
})
