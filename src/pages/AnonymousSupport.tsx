import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Download, Shield } from 'lucide-react';
import Button from '@/components/Button';
import { SupportMessage } from '@/assets/types';
import { toast } from 'sonner';

const AnonymousSupport: React.FC = () => {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [resources, setResources] = useState<{
    crisisHotlines: string[];
    localSupport: string[];
    onlineResources: string[];
    safetyTips: string[];
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session and load resources
  useEffect(() => {
    initializeSession();
    loadResources();
  }, []);

  const initializeSession = async () => {
    try {
      const response = await fetch('/api/support/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json() as { sessionId: string; messages: SupportMessage[] };
        setSessionId(data.sessionId);
        setMessages(data.messages);
      } else {
        toast.error('Failed to initialize support session');
        // Fallback to local messages
        setMessages([{
          id: '1', 
          text: "Hello, I'm here to listen. You can share anything you're comfortable with. This is a safe, anonymous space.", 
          sender: 'support', 
          timestamp: new Date() 
        }]);
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      toast.error('Error starting support session');
      // Fallback to local messages
      setMessages([{
        id: '1', 
        text: "Hello, I'm here to listen. You can share anything you're comfortable with. This is a safe, anonymous space.", 
        sender: 'support', 
        timestamp: new Date() 
      }]);
    }
  };

  const loadResources = async () => {
    try {
      const response = await fetch('/api/support/resources');
      if (response.ok) {
        const data = await response.json() as {
          crisisHotlines: string[];
          localSupport: string[];
          onlineResources: string[];
          safetyTips: string[];
        };
        setResources(data);
      }
    } catch (error) {
      console.error('Error loading resources:', error);
      // Fallback resources
      setResources({
        crisisHotlines: [
          'National Domestic Violence Hotline: 1-800-799-7233',
          'Crisis Text Line: Text HOME to 741741',
          'RAINN Sexual Assault Hotline: 1-800-656-4673'
        ],
        localSupport: [
          'Find local counseling services',
          'Support groups in your area',
          'Legal assistance resources'
        ],
        onlineResources: [
          'Safety planning tools',
          'Educational materials',
          'Community forums'
        ],
        safetyTips: [
          'Use private browsing mode',
          'Clear chat history if needed',
          'Don\'t share identifying information',
          'Trust your instincts'
        ]
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: SupportMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      if (sessionId) {
        const response = await fetch(`/api/support/session/${sessionId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newMessage }),
        });

        if (response.ok) {
          // The support response will be added via the real-time update
        } else {
          throw new Error('Failed to send message');
        }
      } else {
        // Fallback to local response if no session
        setTimeout(() => {
          const responses = [
            "Thank you for sharing that with me. How are you feeling right now?",
            "I understand this must be difficult. You're not alone in this.",
            "That sounds really challenging. Would you like to explore some resources that might help?",
            "I'm here to support you. Take your time, there's no pressure.",
            "Your feelings are completely valid. Thank you for trusting me with this."
          ];
          const supportMessage: SupportMessage = {
            id: (Date.now() + 1).toString(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: 'support',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, supportMessage]);
          setIsTyping(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to local response
      setTimeout(() => {
        const responses = [
          "Thank you for sharing that with me. How are you feeling right now?",
          "I understand this must be difficult. You're not alone in this.",
          "That sounds really challenging. Would you like to explore some resources that might help?",
          "I'm here to support you. Take your time, there's no pressure.",
        ];
        const supportMessage: SupportMessage = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'support',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, supportMessage]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const exportChat = async () => {
    if (!sessionId) {
      toast.error('No active session to export');
      return;
    }

    try {
      const response = await fetch(`/api/support/session/${sessionId}/export`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json() as Record<string, unknown>;
        
        // Create and download file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `support-chat-${sessionId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.success('Chat exported successfully');
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Error exporting chat:', error);
      toast.error('Failed to export chat');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Anonymous Support</h1>
        <p className="text-gray-600 mt-2">Safe, confidential peer support and resource connection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">S</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Support Specialist</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex items-center space-x-1"
                    onClick={exportChat}
                  >
                    <Download className="h-3 w-3" />
                    <span>Export</span>
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>Privacy</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here... (Completely anonymous)"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  disabled={!newMessage.trim() || isTyping}
                  className="flex items-center space-x-1"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-red-700 mb-2">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-sm">⚠️</span>
              </div>
              <span className="font-semibold">Emergency</span>
            </div>
            <p className="text-red-600 text-sm mb-3">
              If you're in immediate danger, please call emergency services
            </p>
            <Button variant="danger" className="w-full flex items-center justify-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Call 911</span>
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Support Resources</h3>
            <div className="space-y-4">
              {resources && Object.entries(resources).map(([category, items]) => (
                category !== 'safetyTips' && (
                  <div key={category}>
                    <h4 className="font-medium text-gray-900 text-sm mb-2">
                      {category === 'crisisHotlines' ? 'Crisis Hotlines' :
                       category === 'localSupport' ? 'Local Support' :
                       category === 'onlineResources' ? 'Online Resources' : category}
                    </h4>
                    <ul className="space-y-1">
                      {(items as string[]).map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 flex items-start space-x-1">
                          <span>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          </div>

          {resources?.safetyTips && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Safety Tips</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                {resources.safetyTips.map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnonymousSupport;