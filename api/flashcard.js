import connectToDatabase from './config/database.js';
import Credential from './models/Credential.js';

export default async function handler(req, res) {
  try {
    const { username, password } = req.body;

    await connectToDatabase();
    const flashcardSets = await Credential.findOne({
      username,
      password,
    }).select('flashcardSets');

    if (!flashcardSets) {
      res.status(400).json({ error: 'Could not find user' });
    }

    res.status(200).json({
      message: 'Successfully found the flashcard Sets',
      flashcardSets,
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not connect to the server' });
  }
}
