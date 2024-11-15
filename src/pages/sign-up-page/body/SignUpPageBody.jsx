import React, { useContext, useState } from 'react';
import './sign-up-page-body.css';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';

const SignUpPageBody = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(user.message);
        setUsername('');
        setPassword('');
        setUser(userData);
        navigate('/main');
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPageBody;
