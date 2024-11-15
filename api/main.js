import connectToDatabase from './config/database.js';
import Credential from './models/Credential.js';

export default async function handler(req, res) {
  try {
    const { username, password } = req.body;

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'This is a POST endpoint' });
    }

    await connectToDatabase();
    const flashcardSets = await Credential.findOne({
      username,
      password,
    }).select('flashcardSets');

    res
      .status(200)
      .json({ message: 'successfully found flashcard sets', flashcardSets });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Connection to server unsuccessful: ${err.message}` });
  }
}
