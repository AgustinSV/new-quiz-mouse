// src/components/SignUp.js
import './sign-up-page-body.css'; // Importing CSS file

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default SignUp;
