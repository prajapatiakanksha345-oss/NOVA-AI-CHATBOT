const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'MISSING_API_KEY') {
    return res.status(500).json({ 
      error: 'API key is missing or invalid. Please check your backend configuration.' 
    });
  }

  // Handle Google Generative AI errors
  if (err.status || err.name === 'GoogleGenerativeAIError') {
    return res.status(err.status || 500).json({ 
      error: err.message || 'Error communicating with Google Gemini API' 
    });
  }

  res.status(500).json({ 
    error: 'Something went wrong. Please try again.' 
  });
};

module.exports = errorHandler;
