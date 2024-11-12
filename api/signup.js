// api/signup.js
import connectToDatabase from './config/database.js';
import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const Credential =
  mongoose.models.Credential || mongoose.model('Credential', credentialSchema);

export default async function handler(req, res) {
  console.log('Received request:', req.method, req.body);

  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      console.log('Database connected in signup handler');

      const { username, password } = req.body;
      const newCredential = new Credential({ username, password });

      await newCredential.save();
      console.log('User saved:', newCredential);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Error saving user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
