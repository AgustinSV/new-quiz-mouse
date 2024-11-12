import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <h1 className="text-white text-xl text-bold font-bold">
        <Link to="/main">Quiz Mouse</Link>
      </h1>
    </div>
  );
}

export default Logo;
