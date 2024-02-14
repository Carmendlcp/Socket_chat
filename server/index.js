import express from 'express'
import logger from 'morgan'


import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express ()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery:{}
})

// const db = createClient({
//     url: "",
//     authToken:"process.env.DB_TOKEN"
// })


io.on('connection', (socket)=>{
    console.log(socket);

    // io.on("connection", socket => {
    //     socket.join("aquí seria idUsuario-idUsariolocker");
    //   });
    //   io.to("aquí seria idUsuario-idUsariolocker").emit("some event");
    // esto es lo que nos dijo ABEL

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    })

    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
    })
})

app.use(logger('dev'))

app.get('/', (req, res)=>{
    res.sendFile(process.cwd() + '/client/index.html' )
})

server.listen(port, ()=>{
    console.log(`Server funcionando en el puerto ${port}`);
})