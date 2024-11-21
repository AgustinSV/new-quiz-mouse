import React, { useEffect, useState } from 'react';
import './MainPageBody.css';
import { useNavigate, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

const MainPageBody = () => {
  const username = localStorage.getItem('qm_username');
  const password = localStorage.getItem('qm_password');
  const [flashcardSets, setFlashcardSets] = useState(null);
  const [aiMessage, setAiMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcardDataAndAIResponse = async () => {
      try {
        const flashcardResponse = fetch('/api/main', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const [flashcardRes] = await Promise.all([flashcardResponse]);

        if (!flashcardRes.ok) throw new Error('Failed to fetch flashcards');

        const { flashcardSets: flashcardSetsData } = await flashcardRes.json();
        setFlashcardSets(flashcardSetsData.flashcardSets);

        const titlesArray = flashcardSetsData.flashcardSets.map(
          (set) => set.title
        );
        const userInput = `Find relationships between titles in the following list: "${titlesArray}". If there are 4 titles total, you should find about 2 relationships, and if there are 16 titles, you should find about 4 connections, and so on. Return a JSON object with the relationship, and the titles included in that relationship.`;

        const aiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userInput }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          setAiMessage(aiData.reply);
          console.log(aiData.reply);
        } else {
          throw new Error('Failed to fetch AI response');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFlashcardDataAndAIResponse();
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
                Flashcard Sets:
              </div>
            </div>
            <div className="flashcard-list-bg">
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
                          bgcolor: 'white',
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
                        bgcolor: 'white',
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
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MainPageBody;
