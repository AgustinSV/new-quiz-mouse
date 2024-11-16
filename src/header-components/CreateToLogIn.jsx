import { Link } from 'react-router-dom';

function CreatetoLogIn() {
  return (
    <Link to="/log-in" className="flex items-center">
      <img
        className="size-5 "
        src="../plus_square.png"
        alt="Create Flashcard Icon"
      />
      <p className="text-white opacity-85 hover:opacity-[1] ml-1">Create</p>
    </Link>
  );
}

export default CreatetoLogIn;
