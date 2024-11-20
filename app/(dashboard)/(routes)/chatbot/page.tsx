"use client"; // This line marks the component as a Client Component

import { useState } from "react";

const ChatbotPage = () => {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [input, setInput] = useState("");

    const generateResponse = (userInput: string): string => {
        const lowerCaseInput = userInput.toLowerCase();

        // Simple keyword-based responses
        if (lowerCaseInput.includes("hello")) {
            return "Hi there! How can I assist you today?";
        } else if (lowerCaseInput.includes("how are you")) {
            return "I'm just a program, but thanks for asking! How can I help you?";
        } else if (lowerCaseInput.includes("what is your name")) {
            return "I'm your friendly chatbot!";
        } else if (lowerCaseInput.includes("help")) {
            return "Sure! What do you need help with?";
        } else if (lowerCaseInput.includes("bye")) {
            return "Goodbye! Have a great day!";
        } else {
            return "I'm not sure how to respond to that. Can you ask something else?";
        }
    };

    const handleSend = () => {
        if (input.trim() === "") return;

        // Add user's message to the chat
        setMessages([...messages, { text: input, sender: 'user' }]);
        
        // Generate bot response
        const botResponse = generateResponse(input);
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, sender: 'bot' }
        ]);

        setInput(""); // Clear the input field
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-black text-emerald-500">
            <h1 className="text-4xl font-bold text-center mb-6">NextAI Chatbot</h1>
            <div className="flex-1 overflow-hidden rounded-lg shadow-lg bg-gray-800">
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-emerald-500'}`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex border-t border-emerald-500">
                    <input
                        type="text"
                        className="flex-1 border-none p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-900 text-emerald-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSend}
                        className="bg-emerald-600 text-white rounded-lg px-4 py-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;