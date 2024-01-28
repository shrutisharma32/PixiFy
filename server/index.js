import  express  from "express";
import * as dotenv from "dotenv";
// for secrets 
import cors from "cors";
// used for cross-origin requests 
// cloudinary for storing images 
import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();
// This line allows us to pool our environment variables from out dotenv file
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
// created API endpoints that we can connect, that we can hook onto frm out frontend side 

app.get("/", async(req, res)=>{
    res.send("Helloooo image generator");
})

const startServer = async() => {

    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, ()=>{
            console.log("Server running on port 8080");
        })
    } catch (error) {
        console.log(error);
    }
    
}
startServer();