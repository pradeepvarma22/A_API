import mongoose from "mongoose";


const connectdb= async() => mongoose.connect(process.env.DB_CONNECTION)

export default connectdb;