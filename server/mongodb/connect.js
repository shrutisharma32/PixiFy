import mongoose, { mongo } from "mongoose";

const connectDB = (url) =>{

    mongoose.set('strictQuery', true);
    // This option will be useful when working with the search functionality 
    
    mongoose.connect(url)
    .then(()=> console.log('MongoDB connected'))
    .catch((err) => console.log(err));

}

export default connectDB; 