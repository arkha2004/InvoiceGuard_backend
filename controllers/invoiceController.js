import fs from 'node:fs';
import { extractInvoices } from '../utils/geminiExtractor.js';

export const processInvoices = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status: 'error', message: 'No invoices provided.' });
    }

    // Get an array of all the temporary file paths
    const filePaths = req.files.map(file => file.path);

    // 1. Send the array of paths to Gemini
    const extractedDataArray = await extractInvoices(filePaths);

    // 2. Clean up ALL temporary files
    filePaths.forEach(filePath => fs.unlinkSync(filePath));

    res.status(200).json({
      status: 'success',
      message: `Successfully processed ${filePaths.length} invoice(s)`,
      data: extractedDataArray // This is always an array!
    });

  } catch (error) {
    console.error('Extraction Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to process invoices.' });
  }
};