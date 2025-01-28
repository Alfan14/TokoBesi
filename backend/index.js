import mongoose from 'mongoose';
import Product from './models/Products.mjs'; // Adjust path

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    const products = await Product.find({});
    console.log('Products:', products);
  } catch (error) {
    console.error('Database query error:', error.stack || error.message || error);
  } finally {
    mongoose.connection.close();
  }
};

testConnection();
