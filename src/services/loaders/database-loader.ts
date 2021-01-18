import mongoose from 'mongoose';

export class DatabaseLoader {
  private static url =  process.env.MONGODB_URL!;

  static load() {
    mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }
}