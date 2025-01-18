import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("already connected to db");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODDB_URI || '',{})
        
        connection.isConnected = db.connections[0].readyState
        console.log("DB connection established");
    }catch(error){
        console.log("Error connecting to Mongo", error);

        process.exit(1);
    }
}

export default dbConnect;