import mongoose from "mongoose";
//mongoose.connect;
type Connectionobject={
    isConnected?:number
}
const connection:Connectionobject={}

async function dbconnect(): 

Promise<void>{
    if(connection.isConnected)
        {
            // to check if already connected
            console.log("Already cnnected to database");
            return;
        }
        try{
            //else try connecting with url
           const db= await mongoose.connect(process.env.MONGODB_URI ||  '',{});
          connection.isConnected= db.connections[0].readyState
          //handling the case as the raedy state is the when db is ready
          console.log("Database Connected Successfully")

        }
        catch(error)
        {
            console.log("Database connection failed",error)
            process.exit(1);

        }

}

export default dbconnect;