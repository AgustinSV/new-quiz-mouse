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
  const location = useLocation();

  useEffect(() => {
    async function getFlashcardSet() {
      const flashcardSetTitle = location.state || '';
      const response = await fetch('/api/flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const { flashcardSets: flashcardSetsData } = await response.json();
      const flashcardSet = flashcardSetsData.flashcardSets.find(
        (flashcardSet) =>
          flashcardSet.title === flashcardSetTitle.flashcardSetTitle
      );
      setFlashcardSets(flashcardSet);
    }
    getFlashcardSet();
  }, [username, password, location]);

  useEffect(() => {
    if (flashcardSets) {
      setCards(flashcardSets.cards);
    }
  }, [flashcardSets]);

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
      setIsFlipped((prev) => !prev);
      const shuffledCards = shuffleArray(cards);
      setCards(shuffledCards);
      setCardIndex(0);
      setIsQuestion('question');
    }
  };

  const prevCard = () => {
    if (cardIndex > 0) {
      setIsFlipped((prev) => !prev);

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
      setIsFlipped((prev) => !prev);

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
              {' '}
              <div className="flashcard-content">
                {cards
                  ? cards[cardIndex][isQuestion]
                  : 'question loading . . .'}
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flashcard-content">
                {cards
                  ? cards[cardIndex][isQuestion]
                  : 'question loading . . .'}
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
            {flashcardSets ? flashcardSets.title : 'Title loading . . .'}
          </div>
          <div className="qa-inner-inner-container">
            {cards ? (
              cards.map((card, index) => (
                <div key={`card-${index}`} className="question-and-answer">
                  <div className="q-or-a">
                    <div className="qa-content">{card['question']}</div>
                  </div>
                  <div className="q-or-a">
                    <div className="qa-content">{card['answer']}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="question-and-answer">
                <div className="q-or-a">
                  <div className="qa-content">
                    Questions and Answers loading...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardPageBody;
