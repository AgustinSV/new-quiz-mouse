import { Link } from "react-router-dom";

function LogoToLandingPage() {
  return (
    <div>
      <h1 className="text-white text-xl text-bold font-bold">
        <Link to="/">Quiz Mouse</Link>
      </h1>
    </div>
  );
}

export default LogoToLandingPage;
