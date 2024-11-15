import { Link } from "react-router-dom";

function Create() {
  return (
    <Link to="/create" className="flex items-center">
      <img
        className="size-5 "
        src="../plus_square.png"
        alt="Create Flashcard Icon"
      />
      <p className="text-white opacity-8 ml-1">Create</p>
    </Link>
  );
}

export default Create;
