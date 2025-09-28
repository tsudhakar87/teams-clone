import { useState, useEffect } from 'react';
import Chat from "./components/chat";
import Auth from "./components/Auth";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // check if user already logged in
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setIsAuthenticated(true);
      setCurrentUser(username);
    }
  }, []);

  const handleAuth = (token: string, username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  if (!isAuthenticated) {
    return <Auth onAuth={handleAuth} />;
  }

  return <Chat currentUser={currentUser} />;
}

export default App;