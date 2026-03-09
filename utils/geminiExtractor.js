import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'node:fs';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileToGenerativePart = (filePath, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
};

export const extractInvoices = async (filePaths) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  // Strict prompt demanding a JSON Array
  const prompt = `You are an elite financial data extraction AI. Extract data from the provided invoice images. 
  You MUST return a JSON ARRAY of objects. Even if there is only one image, return an array with one object.
  Each object must strictly contain: companyName, gstin, bankAccountNumber, ifscCode, totalAmount.`;
  
  const imageParts = filePaths.map(filePath => 
    fileToGenerativePart(filePath, "image/jpeg") 
  );

  const result = await model.generateContent([prompt, ...imageParts]);
  const responseText = result.response.text();
  
  return JSON.parse(responseText); 
};