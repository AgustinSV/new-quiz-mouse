import { Navigate } from 'react-router-dom';

function FlashcardPageBody() {
  const username = localStorage.getItem('qm_username');
  // eslint-disable-next-line
  const password = localStorage.getItem('qm_password');

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <p>This is where the Flashcard Page Body will go</p>
    </div>
  );
}

export default FlashcardPageBody;
