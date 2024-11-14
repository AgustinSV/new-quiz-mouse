import { connectToDatabase } from './config/dabase.js';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectToDatabase();
  } else {
    res.status(500).json({ error: 'Method not supported' });
  }
}
