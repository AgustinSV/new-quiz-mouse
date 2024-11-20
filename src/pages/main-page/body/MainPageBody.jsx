import React, { useEffect, useState } from 'react';
import './MainPageBody.css';
import { useNavigate, Navigate } from 'react-router-dom';

// !
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

//!
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
          <div className="flashcard-set-container">
            <div className="intro-box">
              <div className="greet-user">Welcome {username},</div>
              <div className="header text-xl justify-center">
                Your Flashcard Sets:
              </div>
            </div>
            <div className="flashcard-list">
              {flashcardSets ? (
                flashcardSets.map((flashcardSet, index) => (
                  <div
                    onClick={() => sendToNewPage(flashcardSet.title)}
                    key={index}>
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: 500,
                        bgcolor: '#DAF0F7',
                      }}>
                      <nav aria-label="secondary mailbox folders">
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton component="a">
                              {flashcardSet.title}
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </nav>
                      <Divider />
                    </Box>
                  </div>
                ))
              ) : (
                <div>
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: 500,
                      bgcolor: '#DAF0F7',
                    }}>
                    <nav aria-label="secondary mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton component="a">
                            Loading flashcard sets . . .
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                    <Divider />
                  </Box>
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MainPageBody;
