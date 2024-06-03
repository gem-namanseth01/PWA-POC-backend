import mongoose from 'mongoose';

const username = encodeURIComponent('Vibhuti');
const password = encodeURIComponent('Vibhuti123');
const cluster = 'cluster0.kk1474y.mongodb.net';
const dbName = 'pwa-app'; 

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

const connectDB = async (app) => {
  try {
    // const uri = `mongodb+srv://Vibhuti:Vibhuti123@cluster0.kk1474y.mongodb.net/pwa-app?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
      });
    console.log("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

export default connectDB;

