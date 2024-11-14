import connectToDatabase from './config/database.js';
import Credential from './models/Credential.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const { username, password } = req.body;

      const usernameExist = await Credential.findOne({
        username,
      });

      if (usernameExist) {
        res.status(409).json({ message: 'User name already exists' });
      } else {
        const newCredential = new Credential({ username, password });
        await newCredential.save();

        res.status(201).json({ message: 'User created successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error saving user' });
    }
  } else {
    req.status(405).json({ error: 'Method not allowed' });
  }
}
