import React, { useState } from 'react';
import './sign-up-page-body.css';
import { useNavigate } from 'react-router-dom';

const SignUpPageBody = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        setUsername('');
        setPassword('');
        localStorage.setItem('qm_username', username);
        localStorage.setItem('qm_password', password);
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
