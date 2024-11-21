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
        const userInput = `Analyze the following "${titlesArray}" to identify meaningful and memorable relationships between them. For each of the 'relationships', provide a concise yet impactful 'description' that captures a unique or logically significant connection, keep the vocabulary simple. Return the result as a JSON object where each relationship includes a 'description' and the 'titles' that are being described. The description should be less than 16 words and be ideally at least 3 meaningful connections.`;

        const aiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userInput }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          setAiMessage(JSON.parse(aiData.reply));
        } else {
          throw new Error('Failed to fetch AI response');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFlashcardDataAndAIResponse();
  }, [username, password]);

  useEffect(() => {
    if (aiMessage) {
      console.log('Relationships:', aiMessage.relationships);
    }
  }, [aiMessage]);

  const sendToNewPage = (flashcardSetTitle) => {
    navigate('/flashcard', { state: { flashcardSetTitle } });
  };

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div className="m-container">
      <div className="main-component">
        <div className="flashcard-set-container">
          <div className="intro-box">
            <div className="greet-user">Welcome {username},</div>
            <div className="header text-xl justify-center">Flashcard Sets:</div>
          </div>
          <div className="flashcard-list-bg">
            <div className="flashcard-list">
              {aiMessage?.relationships?.length > 0 ? (
                aiMessage.relationships.map((relationship, index) => (
                  <div key={`relationship-${index}`}>
                    <div>
                      {console.log(relationship)}
                      <strong className="relationship">
                        Relationship:
                      </strong>{' '}
                      {relationship.description || 'No relationship'}
                    </div>
                    {relationship.titles?.length > 0 ? (
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 500,
                          bgcolor: 'white',
                        }}>
                        <nav aria-label="secondary mailbox folders">
                          <List>
                            {relationship.titles.map((title, titleIndex) => (
                              <ListItem
                                key={`title-${index}-${titleIndex}`}
                                disablePadding>
                                <ListItemButton
                                  onClick={() => sendToNewPage(title)}
                                  component="a">
                                  {title}
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </nav>
                        <Divider />
                      </Box>
                    ) : (
                      <div>No titles available</div>
                    )}
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
                            Loading relationships . . .
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
    </div>
  );
};

export default MainPageBody;
