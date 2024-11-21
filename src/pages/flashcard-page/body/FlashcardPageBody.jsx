import { Navigate, useLocation } from 'react-router-dom';
import './FlashcardPageBody.css';
import { useEffect, useState } from 'react';

function FlashcardPageBody() {
  const username = localStorage.getItem('qm_username');
  const password = localStorage.getItem('qm_password');
  const [flashcardSets, setFlashcardSets] = useState(null);
  const [cards, setCards] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isQuestion, setIsQuestion] = useState('question');
  const [isFlipped, setIsFlipped] = useState(false);
  const [aiMessage, setAiMessage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function getFlashcardSetAndGenerateRelationships() {
      try {
        const flashcardSetTitle = location.state || '';
        const response = await fetch('/api/flashcard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const { flashcardSets: flashcardSetsData } = await response.json();
        const flashcardSet = flashcardSetsData.flashcardSets.find(
          (set) => set.title === flashcardSetTitle.flashcardSetTitle
        );
        setFlashcardSets(flashcardSet);
        setCards(flashcardSet.cards);

        // Pass full question-answer pairs to AI
        const questionAnswerPairs = flashcardSet.cards.map((card) => ({
          question: card.question,
          answer: card.answer,
        }));
        const userInput = `Analyze the following question-answer pairs to identify meaningful and memorable relationships between them. For each relationship, provide a concise yet impactful description that captures a unique or logically significant connection, keep the vocabulary simple. Return the result as a JSON object where each relationship includes a 'description' and 'involved_pairs'. The description should be less than 16 words and be ideally at least 3 meaningful connections. Additionally, the "involved_pairs" should be an array with objects that have a "question" and "answer" method:\n${JSON.stringify(
          questionAnswerPairs
        )}`;

        const aiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userInput }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          setAiMessage(JSON.parse(aiData.reply)); // Parse AI response
        } else {
          console.error('Failed to fetch AI relationships');
        }
      } catch (error) {
        console.error(
          'Error fetching flashcard data or AI relationships:',
          error
        );
      }
    }

    getFlashcardSetAndGenerateRelationships();
  }, [username, password, location]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffleCard = () => {
    if (cards) {
      setIsFlipped(false);
      const shuffledCards = shuffleArray(cards);
      setCards(shuffledCards);
      setCardIndex(0);
      setIsQuestion('question');
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setIsFlipped(false);
      setCardIndex((prevIndex) => prevIndex - 1);
      setIsQuestion('question');
    }
  };

  const flipCard = () => {
    setIsFlipped((prev) => !prev);
    setIsQuestion((prevState) =>
      prevState === 'question' ? 'answer' : 'question'
    );
  };

  const nextCard = () => {
    if (cards && cardIndex < cards.length - 1) {
      setIsFlipped(false);
      setCardIndex((prevIndex) => prevIndex + 1);
      setIsQuestion('question');
    }
  };

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div className="f-container">
      <div className="flashcard-container">
        <div className="title">
          {flashcardSets ? flashcardSets.title : 'Title loading . . .'}
        </div>
        <div className="flashcard" onClick={flipCard}>
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <div className="flashcard-content">
                {cards ? cards[cardIndex][isQuestion] : 'Question loading...'}
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flashcard-content">
                {cards ? cards[cardIndex][isQuestion] : 'Answer loading...'}
              </div>
            </div>
          </div>
        </div>
        <div className="all-flashcard-options">
          <div onClick={shuffleCard} className="shuffle-card">
            <img
              className="shuffle-img"
              src="/shuffle-icon.png"
              alt="shuffle icon"
            />
          </div>
          <div className="flashcard-options">
            <div onClick={prevCard} className="prev-card">
              <img
                className="flashcard-options-imgs"
                src="/left-arrow.png"
                alt="left arrow icon"
              />
            </div>
            <div onClick={flipCard} className="flip-cards">
              <img
                className="flashcard-options-imgs flip-card-img"
                src="/flip-card.png"
                alt="flip card icon"
              />
            </div>
            <div onClick={nextCard} className="next-card">
              <img
                className="flashcard-options-imgs"
                src="/right-arrow.png"
                alt="right arrow icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="qa-container">
        <div className="qa-inner-container">
          <div className="qa-title">
            {flashcardSets ? flashcardSets.title : 'Relationships loading...'}
          </div>
          <div className="qa-inner-inner-container">
            {aiMessage?.relationships?.length > 0 ? (
              aiMessage.relationships.map((relationship, index) => (
                <div
                  key={`relationship-${index}`}
                  className="relationship-container">
                  <strong>Relationship:</strong>{' '}
                  {relationship.description || 'No description'}
                  {relationship.involved_pairs?.map((pair, pairIndex) => (
                    <div
                      key={`qa-pair-${index}-${pairIndex}`}
                      className="question-and-answer">
                      <div className="q-or-a">
                        {console.log(pair)}
                        <div className="qa-content">
                          {pair.question || 'No question'}
                        </div>
                        <div className="qa-content">
                          {pair.answer || 'No answer'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div>Generating relationships...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardPageBody;
