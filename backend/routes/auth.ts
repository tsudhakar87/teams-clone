import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authRouter = express.Router();

// temporary in-memory storage - replace with database later
const users: { id: number; username: string; password: string }[] = [];

const JWT_SECRET = 'your-secret-key'; // move to env file later

authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), username, password: hashedPassword };
  users.push(user);
  
  const token = jwt.sign({ id: user.id, username }, JWT_SECRET);
  res.json({ token, username });
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, username }, JWT_SECRET);
  res.json({ token, username });
});

export default authRouter;