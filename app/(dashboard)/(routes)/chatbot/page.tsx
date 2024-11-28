"use client"; // This line marks the component as a Client Component


import React, { useState } from 'react';
import responsesData from './responses.json'; // Adjust the path if necessary

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    const userMessage = userInput;
    const botResponse = getBotResponse(userMessage);

    setChatHistory([...chatHistory, { user: userMessage, bot: botResponse }]);
    setUserInput('');
  };

  const getBotResponse = (message: string) => {
    const intent = responsesData.intents.find((intent) => message.toLowerCase().includes(intent.pattern));
    if (intent) {
      const responses = intent.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    return "Sorry, I didn't understand that.";
  };

  return (
    <div>
      <h1>NextAI Chatbot</h1>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <strong>You:</strong> {chat.user}
            <br />
            <strong>NextAI:</strong> {chat.bot}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;