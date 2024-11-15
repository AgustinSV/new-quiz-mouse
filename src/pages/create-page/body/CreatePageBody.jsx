import { useContext, useState } from 'react';
import { userContext } from '../../../App';
import './CreatePageBody.css';

function CreatePageBody() {
  const [{ user }] = useContext(userContext);
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ question: '', answer: '' }]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const addCard = () => {
    setCards([...cards, { question: '', answer: '' }]);
  };
  // hello again
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, cards, user.username, user.password);
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          cards,
          username: user.username,
          password: user.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setTitle('');
        setCards([{ question: '', answer: '' }]);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Failed to create flashcard set', err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label className="title-label" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />

        {cards.map((card, index) => (
          <div className="qa-pair" key={index}>
            <input
              type="text"
              placeholder="Question"
              value={card.question}
              onChange={(e) =>
                handleCardChange(index, 'question', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Answer"
              value={card.answer}
              onChange={(e) =>
                handleCardChange(index, 'answer', e.target.value)
              }
            />
          </div>
        ))}

        <button className="add-card" type="button" onClick={addCard}>
          +
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreatePageBody;
