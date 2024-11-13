import connectToDatabase from './config/database.js';
import User from './models/User.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const { username, password } = req.body;

      const user = await User.findOne({ username, password }).select(
        'username flashcardSets'
      );

      if (user) {
        res.status(200).json({ message: 'User found', user });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch {
      res.error(500).json({ error: 'Error finding user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
