import mongoose from "mongoose";

export async function connect(){
try{
    await mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", ()=>{
        console.log("mongoDB connected successfully");
    });
    connection.on("error", (err)=>{
        console.log("mongoDB connection error: ", err);
        process.exit();
    });
    await connection.db!.admin().ping();
    console.log("MongoDB is live and reachable");
} catch (error){
    console.log("Error connecting to MongoDB");
    console.log(error);
}
}