import express from 'express'
// import dotenv from 'dotenv'
import {app, server} from './socket/socket.js'
import connectDB from './db/db.connection.js';
import userRoute from './routes/user.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import messageRoute from './routes/message.route.js'
import cors from 'cors' 
import cookieParser  from 'cookie-parser'
import bodyParser from 'body-parser';
 
// dotenv.config();



// const app= express()
const port = process.env.PORT || 3000;



const corsOption = {
    origin:[process.env.FRONTEND_URL, "chatsy-chat-app.vercel.app"],
    // origin: ["http://localhost:5173"],
    credentials:true,
}
app.use(cors(corsOption))

// // Database Connection
connectDB()

// // Middleware
app.use(express.json()) 

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
 



//  All Routes 
 app.use("/api/user",userRoute);
 app.use("/api/message", messageRoute);
app.use(errorMiddleware)

/ 

 

server.listen(port, ()=>{
    console.log("server is listening for port 8000")
    // connectDb();
})
app.get('/',(req, res)=>{
    res.send("Hi i am kishan umar")

})
