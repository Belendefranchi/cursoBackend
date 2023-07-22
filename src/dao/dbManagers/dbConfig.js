import mongoose from 'mongoose';
import config from '../../config/config.js';

const URI = config.mongoUrl;

try {
  await mongoose.connect(URI);
  console.log('Base de datos conectada con dbConfig');
} catch (error) {
  console.log(error);
}