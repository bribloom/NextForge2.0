"use client"; // This line marks the component as a Client Component

import React, { useState, useEffect } from 'react';
import javaResponses from './javaresponses.json'; // Adjust the path if necessary
import pythonResponses from './pythonresponses.json'; // Adjust the path if necessary

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [language, setLanguage] = useState('java'); // Default language
  const [responsesData, setResponsesData] = useState(javaResponses); // Set initial responses

  useEffect(() => {
    // Update responsesData based on selected language
    if (language === 'java') {
      setResponsesData(javaResponses);
    } else if (language === 'python') {
      setResponsesData(pythonResponses);
    }
  }, [language]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    const userMessage = userInput;
    const botResponse = getBotResponse(userMessage);

    setChatHistory([...chatHistory, { user: userMessage, bot: botResponse }]);
    setUserInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the Enter key (like form submission)
      handleSendMessage();
    }
  };

  const getBotResponse = (message: string) => {
    // Use regex to match the intent patterns
    const intent = responsesData.intents.find((intent) => 
      new RegExp(`^(${intent.pattern})$`, 'i').test(message) // Use ^ and $ to match the whole string
    );

    if (intent) {
      const responses = intent.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    return "Sorry, I didn't understand that.";
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">NextAI Chatbot</h1>
      
      {/* Language Selector */}
      <div className="mb-4">
        <label htmlFor="language" className="block mb-2 text-black">Select Programming Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border border-gray-300 rounded text-black"
        >
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className="max-h-96 overflow-y-auto mb-4 p-4 border rounded-lg border-gray-300 bg-gray-50">
        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-2">
            <div className="text-blue-600">
              <strong>You:</strong> {chat.user}
            </div>
            <div className="text-green-600">
              <strong>NextAI:</strong> {chat.bot}
            </div>
          </div>
        ))}
      </div>
      <div className="flex text-black">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // This line attaches the handleKeyDown function
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;