import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageHeader from './pages/landing-page/header/LandingPageHeader';
import LandingPageBody from './pages/landing-page/body/LandingPageBody';
import CreatePageHeader from './pages/create-page/header/CreatePageHeader';
import CreatePageBody from './pages/create-page/body/CreatePageBody';
import FlashcardPageHeader from './pages/flashcard-page/header/FlashcardPageHeader';
import FlashcardPageBody from './pages/flashcard-page/body/FlashcardPageBody';
import LogInPageHeader from './pages/log-in-page/header/LogInPageHeader';
import LogInPageBody from './pages/log-in-page/body/LogInPageBody';
import SignUpPageHeader from './pages/sign-up-page/header/SignUpPageHeader';
import SignUpPageBody from './pages/sign-up-page/body/SignUpPageBody';
import MainPageHeader from './pages/main-page/header/MainPageHeader';
import MainPageBody from './pages/main-page/body/MainPageBody';

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
