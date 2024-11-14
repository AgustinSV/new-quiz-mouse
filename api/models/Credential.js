import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const flashcardSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [flashcardSchema],
});

const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  flashcardSets: [flashcardSetSchema],
});

const Credential =
  mongoose.models.Credential || mongoose.model('Credential', credentialSchema);

export default Credential;
