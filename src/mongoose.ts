import mongoose from 'mongoose';

const fullURL = process.env.MONGODB_URL!;

export const connectMongoose = () => {
  mongoose.connect(fullURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};


