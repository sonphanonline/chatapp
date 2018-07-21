const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const clients = []
const client_id_length = 'B73fyR3cNcd8p8dSAAAD'.length

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('a user connected: ' + socket.id)

    clients.push({ id: socket.id, socket: socket })

    socket.emit('client id',socket.id)

    io.emit('clients list', clients.map((x,index)=>{
        return {id:x.id,index:index}
    }))

    socket.on('chat message', msg => {
        console.log(msg)

        toId = msg.substring(0,client_id_length);

        // if (msg.indexOf('1') !== -1) {
        //     io.emit('chat message', 'server : ' + msg)
        // }
        // else {
        //     socket.emit('chat message', 'your message: ' + msg)
        // }
        for(index = 0;index<clients.length;index++){
            if (clients[index].id === toId) {
                clients[index].socket.emit('chat message',msg.substring(client_id_length))
                break
            }
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id)
        index = 0;
        for (index = 0; index < clients.length; index++) {
            console.log(clients[index].id)
            if (clients[index].id === socket.id) {
                console.log('removed: ' + socket.id)
                console.log(clients.splice(index,1))
                break
            }
        }

        clients.map(x=>console.log(x.id))
    })
})

server.listen(3000, () => {
    console.log('The server is running: http://localhost:3000')
})

// can we change to use a new port?