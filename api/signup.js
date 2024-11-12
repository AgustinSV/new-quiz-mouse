import connectToDatabase from './config/database.js';
import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const Credential =
  mongoose.models.Credential || mongoose.model('Credential', credentialSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const { username, password } = req.body;

      const newCredential = new Credential({ username, password });
      await newCredential.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving user' });
    }
  } else {
    req.status(405).json({ error: 'Method not allowed' });
  }
}
