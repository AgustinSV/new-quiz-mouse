import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageHeader from './pages/landing-page/header/LandingPageHeader.jsx';
import LandingPageBody from './pages/landing-page/body/LandingPageBody.jsx';
import CreatePageHeader from './pages/create-page/header/CreatePageHeader.jsx';
import CreatePageBody from './pages/create-page/body/CreatePageBody.jsx';
import FlashcardPageHeader from './pages/flashcard-page/header/FlashcardPageHeader.jsx';
import FlashcardPageBody from './pages/flashcard-page/body/FlashcardPageBody.jsx';
import LogInPageHeader from './pages/log-in-page/header/LogInPageHeader.jsx';
import LogInPageBody from './pages/log-in-page/body/LogInPageBody.jsx';
import SignUpPageHeader from './pages/sign-up-page/header/SignUpPageHeader.jsx';
import SignUpPageBody from './pages/sign-up-page/body/SignUpPageBody.jsx';
import MainPageHeader from './pages/main-page/header/MainPageHeader.jsx';
import MainPageBody from './pages/main-page/body/MainPageBody.jsx';

function App() {
  return (
    <Router>
      <div className="white min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPageHeader />
                <LandingPageBody />
              </>
            }
          />
          {/* Not Create Yet */}
          <Route
            path="/main"
            element={
              <>
                <MainPageHeader />
                <MainPageBody />
              </>
            }
          />
          {/* Not Create Yet */}
          <Route
            path="/create"
            element={
              <>
                <CreatePageHeader />
                <CreatePageBody />
              </>
            }
          />
          {/* Not Create Yet */}
          <Route
            path="/log-in"
            element={
              <>
                <LogInPageHeader />
                <LogInPageBody />
              </>
            }
          />
          {/* Not Create Yet */}
          <Route
            path="/sign-up"
            element={
              <>
                <SignUpPageHeader />
                <SignUpPageBody />
              </>
            }
          />
          {/* Not Used Yet */}
          <Route
            path="/flashcard"
            element={
              <>
                <FlashcardPageHeader />
                <FlashcardPageBody />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
