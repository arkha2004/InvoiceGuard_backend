// routes/invoiceRoutes.js
import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { processInvoices } from '../controllers/invoiceController.js';

const router = express.Router();

// Allow up to 10 files at once under the key 'invoices'
router.post('/upload', upload.array('invoices', 10), processInvoices);

export default router;