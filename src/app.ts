import express from 'express';
import mongoose from 'mongoose';
import myListRoutes from './routes/myListRoutes';

const app = express();

app.use(express.json());
app.use('/mylist', myListRoutes);

mongoose.connect('mongodb://localhost:27017/ott-platform')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;
