const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { email, phone, handle, password, pin } = req.body;

    // Hash password and pin
    const passwordHash = await bcrypt.hash(password, 10);
    const pinHash = pin ? await bcrypt.hash(pin, 10) : null;

    const user = await createUser({ email, phone, handle, passwordHash, pinHash });
    
    // Generate token
    const token = jwt.sign({ id: user.id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ 
      token, 
      user: {
        id: user.id,
        email: user.email,
        handle: user.handle,
        role: 'user',
        is_anonymous: true,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = await findUserByEmail(email);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ 
      token, 
      user: {
        id: user.id,
        email: user.email,
        handle: user.handle,
        role: user.role,
        is_anonymous: user.is_anonymous,
        created_at: user.created_at
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };