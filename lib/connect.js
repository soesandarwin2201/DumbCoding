import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
     mongoose.set('strictQuery', true);

     if(isConnected){
          console.log('Monogdb is cconnected');
          return
     }
     
      try{
      await mongoose.connect(process.env.MONGO_URI, {
          dbName: 'dumbcoding',
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
      isConnected = true;
      }catch(error){
        console.log(error);
      }
}