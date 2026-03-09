export const checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'InvoiceGuard API is operational 🟢',
    timestamp: new Date().toISOString(),
  });
};
