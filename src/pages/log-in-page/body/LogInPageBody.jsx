// src/components/Login.js
import '../../sign-up-page/body/sign-up-page-body.css';

const LogIn = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Log In</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Submit</button>
      </div>
    </div>
  );
};
export default LogIn;
