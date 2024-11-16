import { Navigate } from 'react-router-dom';
import './FlashcardPageBody.css';
import { useEffect, useState } from 'react';

function FlashcardPageBody() {
  const username = localStorage.getItem('qm_username');
  const password = localStorage.getItem('qm_password');
  const [flashcardSets, setFlashcardSets] = useState(null);
  const [cards, setCards] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    async function getFlashcardSet() {
      const response = await fetch('/api/flashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const { flashcardSets: flashcardSetsData } = await response.json();
      setFlashcardSets(flashcardSetsData.flashcardSets[3]);
    }
    getFlashcardSet();
  }, [username, password]);

  useEffect(() => {
    if (flashcardSets) {
      setCards(flashcardSets.cards);
    }
  }, [flashcardSets]);

  if (!username) {
    return <Navigate to="/" />;
  }

  if (flashcardSets) {
    //   console.log(flashcardSets);
  }

  if (cards) {
    // console.log(cards[0].question);
    // let cardOrder = ;
    // const firstCard = cards[0];
    // const lastCard = cards[-1];
  }

  const prevCard = () => {
    if (cardIndex > 0) {
      setCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextCard = () => {
    if (cards && cardIndex < cards.length - 1) {
      setCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="f-container">
      <div className="title">
        {flashcardSets ? flashcardSets.title : 'Title is loading . . .'}
      </div>
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-content">
            {cards ? cards[cardIndex].question : 'question loading . . .'}
          </div>
        </div>
        <div className="flashcard-options">
          <div onClick={prevCard} className="prev-card">
            prev
          </div>
          <div className="flip-card">flip</div>
          <div onClick={nextCard} className="next-card">
            next
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardPageBody;
