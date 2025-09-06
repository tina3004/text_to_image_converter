import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('MongoDB connected successfully');
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/text_to_image`);
}
export default connectDB;