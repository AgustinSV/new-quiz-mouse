import React, { useState, useEffect } from "react";
import "./MatchingPageBody.css";

function MatchingPageBody() {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([]);  // To store shuffled items
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [temporaryCorrect, setTemporaryCorrect] = useState([]);  // Track temporarily correct items for animation

  useEffect(() => {
    const fetchFlashcards = async () => {
      const username = localStorage.getItem("qm_username");
      const password = localStorage.getItem("qm_password");
  
      if (!username || !password) {
        console.error("No user credentials found. Please log in.");
        return;
      }
  
      try {
        const response = await fetch("/api/matching", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
  
          // Create unique cards
          const cards = Array.from(
            new Map(
              data.matchingData
                .flatMap((set) => set.cards.map((card) => ({
                  question: card.question,
                  answer: card.answer,
                  id: card._id,
                })))
                .map((card) => [card.id, card])
            ).values()
          );
  
          setFlashcards(cards);
  
          // Create and shuffle unique items
          const uniqueItems = Array.from(
            new Map(
              cards.reduce((acc, { question, answer, id }) => {
                acc.push({ type: "question", content: question, id });
                acc.push({ type: "answer", content: answer, id });
                return acc;
              }, []).map((item) => [`${item.id}-${item.type}`, item])
            ).values()
          );
  
          setShuffledItems(shuffleArray(uniqueItems));
        } else {
          console.error("Failed to fetch flashcards");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchFlashcards();
  }, []);
  
  
  
  

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  

  const handleSelect = (item) => {
    if (selectedItems.length === 2) return; // Prevent selecting more than two items

    const newSelection = [...selectedItems, item];
    setSelectedItems(newSelection);

    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      const isMatch =
        first.type === "question" &&
        second.type === "answer" &&
        first.id === second.id;

      if (isMatch) {
        // Correct match
        setTemporaryCorrect([first.id, second.id]);  // Temporarily mark correct for animation
        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, first.id, second.id]);
          setSelectedItems([]); // Reset selection
          setTemporaryCorrect([]);  // Clear temporary correct items
        }, 1000);
      } else {
        // Incorrect match
        setTimeout(() => {
          setSelectedItems([]); // Reset selection without removing items
        }, 1000);
      }
    }
  };

  const renderItems = () => {
    return shuffledItems
      .filter((item) => !matchedPairs.includes(item.id)) // Exclude matched pairs
      .map((item) => {
        const isSelected = selectedItems.some(
          (selected) => selected.id === item.id && selected.type === item.type
        );
  
        const isCorrect = temporaryCorrect.includes(item.id);
        const isIncorrect =
          isSelected &&
          selectedItems.length === 2 &&
          !isCorrect;
  
        return (
          <div
            key={`${item.id}-${item.type}`}
            className={`matching-item ${isCorrect ? "correct" : ""} ${
              isIncorrect ? "incorrect" : ""
            } ${isSelected ? "selected" : ""}`}
            onClick={() => handleSelect(item)}
          >
            {item.content}
          </div>
        );
      });
  };
  

  return (
    <div className="matching-container">
      <h1>Matching Game</h1>
      <div className="matching-grid">{renderItems()}</div>
      <div className="button-container">
        <button
          className="button-reset"
          onClick={() => {
            setSelectedItems([]);
            setMatchedPairs([]);
            setTemporaryCorrect([]);  // Clear temporary correct items when resetting
          }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default MatchingPageBody;
