import mongoose from "mongoose";
// import dotenv from 'dotenv'
 const connectDB = async ()=> {

    try {
        mongoose.connection.on("connected", ()=> {
            console.log("Database connected");
        });

        await mongoose.connect(process.env.MONGODB_URL ,
            //  { useNewUrlParser: true, useUnifiedTopology: true,}    optional line use r not
            );
    } catch (error) {
        console.log("MongoDB connection failed", error.message);
        process.exit(1);
    }
 }

 export default connectDB;
//  2HsIGLyrff2d1f8f