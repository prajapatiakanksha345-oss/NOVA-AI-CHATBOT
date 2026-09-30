const API_URL = 'http://localhost:5000/api/chat';

export const sendMessageToAI = async (message, conversationHistory) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversation: conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};
