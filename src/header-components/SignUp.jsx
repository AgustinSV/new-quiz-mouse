import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <Link to="/sign-up">
      <div className="text-white p-2 pl-5 pr-5 bg-red-500 hover:bg-[#f08a8a] w-fit">
        <p>Sign Up</p>
      </div>
    </Link>
  );
}

export default SignUp;
