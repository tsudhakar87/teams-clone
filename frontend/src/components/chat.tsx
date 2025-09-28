import React, {useState, useEffect} from 'react';
import { io, Socket } from 'socket.io-client';
import { Button, Input, Card, Text } from "@fluentui/react-components";

interface Message {
    id: string;
    user: string;
    message: string;
    timestamp: Date;
}

const Chat: React.FC = () => {
    // some state variables
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const roomId = 'general';

    return <></>
}

export default Chat;