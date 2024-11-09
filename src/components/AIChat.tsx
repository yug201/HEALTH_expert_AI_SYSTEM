import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';
import { chatWithAI, analyzeImage } from '../services/ai';

export default function AIChat() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { messages, metrics, reports, addMessage, addReport } = useHealthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addMessage({ role: 'user', content: message });
    setMessage('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(
        message,
        metrics[metrics.length - 1],
        reports[reports.length - 1]?.analysis
      );
      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      addMessage({
        role: 'assistant',
        content: 'Please upload an image smaller than 4MB.',
      });
      return;
    }

    // Add upload indicator message
    addMessage({
      role: 'assistant',
      content: 'Analyzing your medical report...',
    });
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imageData = event.target?.result as string;
        const analysis = await analyzeImage(imageData);
        
        // Store the report
        addReport({
          type: 'other',
          imageUrl: URL.createObjectURL(file),
          analysis,
        });

        // Add analysis result
        addMessage({
          role: 'assistant',
          content: analysis,
        });
      } catch (error) {
        addMessage({
          role: 'assistant',
          content: "I apologize, but I couldn't analyze the image. Please try again.",
        });
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      setIsLoading(false);
      addMessage({
        role: 'assistant',
        content: 'There was an error reading the file. Please try again.',
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-[600px]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">AI Health Expert</h2>
        <p className="text-sm text-gray-500 mt-1">Upload medical reports or ask health questions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="animate-pulse">Analyzing...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex items-center gap-2">
        <label className="cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Upload className="w-6 h-6 text-gray-500 hover:text-blue-600" />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your health question..."
          className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}