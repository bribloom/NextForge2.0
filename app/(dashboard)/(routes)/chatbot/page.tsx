"use client"; // This line marks the component as a Client Component
//INTENT RECOGNITION AND COMPROMISE
import React, { useState, useEffect } from 'react';
import javaResponses from './javaresponses.json'; // Adjust the path if necessary
import pythonResponses from './pythonresponses.json'  ; // Adjust the path if necessary
import jsResponses from './jsresponses.json' 
import csharpResponses from './csharpresponses.json'; // Adjust the path if necessary
import mysqlResponses from './mysqlresponses.json'; // Adjust
import { Banner } from "@/components/banner";
import nlp from 'compromise';

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string | React.ReactNode }[]>([]);  const [language, setLanguage] = useState('java'); // Default  and change to fix error for red color
  const [responsesData, setResponsesData] = useState(javaResponses); // Set initial responses
  const [faqs, setFaqs] = useState<{ question: string; pattern: string }[]>([]); // State for FAQs

  useEffect(() => {
    // Update responsesData based on selected language
    if (language === 'java') {
      setResponsesData(javaResponses);
    } else if (language === 'python') {
      setResponsesData(pythonResponses);
    } else if (language === 'javascript') {
      setResponsesData(jsResponses);
    } else if (language === 'c#') {
      setResponsesData(csharpResponses);
    } else if (language === 'mysql') {
      setResponsesData(mysqlResponses);
    }
    console.log(`Responses updated to: ${language}`, responsesData); // Debugging line
  }, [language]);



  
  useEffect(() => {
    // Define FAQ
    const faqList = [
      { question: "What is Java?", pattern: "What is Java?" },
      { question: "what are the four principles of oops?", pattern: "what are the four principles of oops?" },
      { question: "What is oop?", pattern: "what is oop?" },
      
    ];
    // Randomly select FAQs
    setFaqs(faqList.sort(() => Math.random() - 0.5)); // Shuffle the FAQs
  }, []);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };
  const handleClearChat = () => {
    setChatHistory([]); // Clear the chat history
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
    const doc = nlp(message);
    const intent = responsesData.intents.find((intent) => {
      const regex = new RegExp(`${intent.pattern.replace('?', '\\?')}\\??`, 'i');
      console.log(`Checking pattern: ${intent.pattern}, against message: ${message}, result: ${regex.test(message)}`); // Debugging line
      return regex.test(message) || doc.has(intent.pattern);
    });

    if (intent) {
      const responses = intent.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return (
      <div style={{ color: 'red' }}>
        Thank you for your inquiry. However, I must inform you that my current dataset is limited, and I do not have the information necessary to address your specific prompt at this time.
      </div>
    );  
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleFAQClick = (pattern: string) => {
    const response = getBotResponse(pattern);
    setChatHistory([...chatHistory, { user: `FAQ: ${pattern}`, bot: response }]);
  };

  return (
    <div>
         <div className="font-semibold mb-5">
            <Banner
                variant={"success"}
                label="Reminder: Our Next chatbot's capabilities are currently limited by its dataset. We appreciate your understanding as we work to improve its responses!"
                />
            </div>
   
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">Next Chatbot</h1>
      
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
          <option value="javascript">Javascript</option>
          <option value="c#">C#</option>
          <option value="mysql">MySQL</option>


        </select>
      </div>

      <div className="max-h-96 overflow-y-auto mb-4 p-4 border rounded-lg border-gray-300 bg-gray-50">
        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-2">
            <div className="text-blue-600">
              <strong>You:</strong> {chat.user}
            </div>
            <div className="text-green-600">
              <strong>NextBot:</strong> {chat.bot}
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
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-emerald-500 text-white p-2 rounded-r-lg hover:bg-emerald-700 transition"
        >
          Send
        </button>
      </div>

  {/* FAQ Section */}
  <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Frequently Asked Questions</h2>
        <ul className="space-y-2">
          {faqs.map((faq, index) => (
            <li key={index}>
              <button 
                onClick={() => handleFAQClick(faq.pattern)} 
                className="text-emerald-500 underline hover:text-emerald-700"
              >
                {faq.question}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleClearChat}
        className="w-full bg-red-500 mt-5 text-white p-2 rounded-2xl hover:bg-red-600 transition"
      >
        Clear Chat
      </button>
    </div>
    </div>
  );
};

export default Chatbot;