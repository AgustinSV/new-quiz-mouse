import { connectToDatabase } from './config/dabase.js';
import { Credential } from './models/Credential.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(500).json({ error: 'Method not supported' });
  }

  await connectToDatabase();

  const { title, cards, username, password } = req.body;
  if (!title || !cards || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newFlashcardSet = { title, cards };
  const updatedUser = await Credential.findOneAndUpdate(
    { username, password },
    { $push: { flashcardSets: newFlashcardSet } },
    { new: true }
  );

  res
    .status(200)
    .json({ message: 'Flashcard set created successfully', user: updatedUser });
}
