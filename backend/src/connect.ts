import mongoose from "mongoose";

async function connectToMongoDB(url: string) {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
        
}

export default connectToMongoDB;