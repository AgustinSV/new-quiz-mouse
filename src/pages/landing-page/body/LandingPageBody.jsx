import { Link } from 'react-router-dom';

function LandingPageBody() {
  return (
    <div>
      <div className="flex flex-col mt-32 items-center space-y-3">
        <div className="text-white font-bold text-5xl p-2 pb-4 border bg-blue-500 w-fit">
          <p>Fun & Interactive</p>
          <p>Learning</p>
        </div>
        <div className="text-white p-2 bg-blue-500 w-fit">
          <p className=" opacity-85">
            Engage with interactive flashcards and games designed
          </p>
          <p className="opacity-85">
            to make learning fun and effective for young learners
          </p>
        </div>
        <Link to="/sign-up" className="text-white p-2 bg-red-500 w-fit">
          <p className="opacity-85">Start Learning</p>
        </Link>

        <div>
          <img
            className="bottom-0 size-96 w-full"
            src="../Mom_kid_learning.png"
            alt="Mother and daughter having fun studying"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPageBody;
