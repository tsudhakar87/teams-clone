import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import '../App.css';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

interface ChatProps {
  currentUser: string;
}

const Chat: React.FC<ChatProps> = ({ currentUser }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const roomId = 'general';

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);
    
    newSocket.emit('join-room', roomId);
    
    newSocket.on('receive-message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      newSocket.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      const messageData: Message = {
        id: Date.now().toString(),
        user: currentUser, // use actual username now
        message: inputMessage,
        timestamp: new Date()
      };
      
      socket.emit('send-message', { ...messageData, roomId });
      setMessages(prev => [...prev, messageData]);
      setInputMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Teams Clone - Welcome {currentUser}</h1>
      <div className="chat-container">
        <div className="messages">
          {messages.map(msg => (
            <div key={msg.id} className="message">
              <strong>{msg.user}:</strong> {msg.message}
              <small> ({new Date(msg.timestamp).toLocaleTimeString()})</small>
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;