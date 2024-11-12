import mongoose from "mongoose";

const url = "mongodb+srv://sebastianh:Sebastian_321@cluster0.efkaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


export const conectar = async () => {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(url);
      console.log("successfully connected to MongoDB!");
    } catch(error) {
      // Ensures that the client will close when you finish/error
      console.error(error)
    }
  }