const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Or gemini-1.5-pro

const generateResponse = async (message, conversationHistory) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('MISSING_API_KEY');
  }

  // Ensure genAI has the actual key if it was initialized early
  const runtimeGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const runtimeModel = runtimeGenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  // Convert our conversation format to Gemini format
  const history = conversationHistory.map(msg => ({
    role: msg.role === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const chat = runtimeModel.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage([{ text: message }]);
  const response = await result.response;
  return response.text();
};

module.exports = {
  generateResponse
};
