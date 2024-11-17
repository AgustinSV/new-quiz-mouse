import React, { useEffect, useState } from 'react';
import './MainPageBody.css';
import { useNavigate, Navigate } from 'react-router-dom';

const MainPageBody = () => {
  const username = localStorage.getItem('qm_username');
  const password = localStorage.getItem('qm_password');
  const [flashcardSets, setFlashcardSets] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function flashcardSetGatherer() {
      const response = await fetch('/api/main', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.error('Fetch request failed');
      }

      const { flashcardSets: flashcardSetsData } = await response.json();
      setFlashcardSets(flashcardSetsData.flashcardSets);
    }

    flashcardSetGatherer();
  }, [username, password]);

  const sendToNewPage = (flashcardSetTitle) => {
    navigate('/flashcard', { state: { flashcardSetTitle } });
  };

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="m-container">
        <div className="main-component">
          <div className="greet-user">Welcome {username},</div>
          <div className="header text-xl justify-center">
            Your Flashcard Sets:
          </div>
          <div className="flashcard-set-container">
            {flashcardSets ? (
              flashcardSets.map((flashcardSet, index) => (
                <div
                  onClick={() => sendToNewPage(flashcardSet.title)}
                  className="flashcard-sets"
                  key={index}>
                  {flashcardSet.title}
                </div>
              ))
            ) : (
              <div className="loading-flashcard-sets">
                Loading Flashcard Sets . . .
              </div>
            )}
          </div>
        </div>
        {/* <div className="side-component">
          <div className="box bg-blue-500 p-4 text-white m-16 flex flex-col space-y-4">
            <div>PlaceHolder Feature</div>
          </div>
          <div className="box bg-blue-500 p-4 text-white m-16 flex flex-col space-y-4">
            <div>PlaceHolder Feature</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MainPageBody;
