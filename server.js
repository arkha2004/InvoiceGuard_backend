import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//local imports
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse incoming JSON
app.use(express.urlencoded({ extended: true }));

// Database Connection (Commented out until you spin up MongoDB)
/*
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 MongoDB Connected'))
  .catch(err => console.error('🔴 MongoDB Connection Error:', err));
*/

// Health Check Route
app.get('/api/health', (req, res) => {
  res
    .status(200)
    .json({ status: 'OK', message: 'InvoiceGuard Backend is alive.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
