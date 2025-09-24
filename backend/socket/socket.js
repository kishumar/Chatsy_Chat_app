import dotenv from "dotenv";
dotenv.config();


import {Server} from "socket.io";
import express from 'express'
import http from 'http'

const app = express();

const server = http.createServer(app);

// console.log(process.env.FRONTEND_URL)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

const userSocketMap = {

}

io.on("connection", (socket)=>{
    const userId= socket.handshake.query.userId;
    if(!userId) return;

    userSocketMap[userId]= socket.id;

    // console.log(Object.keys(userSocketMap))
    io.emit("onlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=> {
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    })

});

const getSocketId = (userId)=> {
    return userSocketMap[userId];
}

export {io, app, server, getSocketId}