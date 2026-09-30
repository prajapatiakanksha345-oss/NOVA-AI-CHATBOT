const { generateResponse } = require('../services/geminiService');

const generateChatResponse = async (req, res, next) => {
  try {
    const { message, conversation } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await generateResponse(message, conversation || []);
    
    res.json({ reply });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateChatResponse
};
