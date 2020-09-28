require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socket = require('socket.io')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Src
const router = require('./src/routers/index')

// Use packages
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// Socket.io
const io = socket(server)

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('welcomeMessage', user =>{
    })

    socket.on('sendMessage', (data, callback) =>{
    })
    socket.on('disconnect', () => {
        console.log(`User: ${socket.id} disconnect`)
    })
})

// Use router
app.use('/api/v1', router)
// Use server
server.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${process.env.PORT}`)
})