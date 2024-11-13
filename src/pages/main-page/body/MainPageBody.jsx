import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import './MainPageBody.css';

const MainPageBody = () => {
  const location = useLocation();
  const { username } = location.state;

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col m-16">
          <div className="greet-user">Hello {username}</div>
          <div className="header text-xl justify-center">
            Your Flashcard Sets:
          </div>
          <div className="flashcard-set-container">
            <div>**ex (1). Users flashcard sets go here**</div>
            <div>**ex (2). Users flashcard sets go here**</div>
            <div>**ex (3). Users flashcard sets go here**</div>
            <div>**ex (4). Users flashcard sets go here**</div>
          </div>
        </div>
        <div>
          <div className="box bg-blue-500 p-4 text-white m-16 flex flex-col space-y-4">
            <div>Search for a flashcard set</div>
          </div>
          <div className="box bg-blue-500 p-4 text-white m-16 flex flex-col space-y-4">
            Create a flashcard set
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageBody;
