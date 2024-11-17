import { Link } from 'react-router-dom';
import './LandingPageBody.css';

function LandingPageBody() {
  return (
    <div className="l-container">
      <img
        className="mom-daughter-img"
        src="/mom-and-daughter.png"
        alt="Mother and daughter having fun studying"
      />
      <div className="mom-daughter-txt flex justify-center items-center mt-32">
        <div className="flex flex-row items-center space-x-10 max-w-screen-lg">
          <div className="flex flex-col">
            <div
              style={{ backgroundColor: '#7197C3' }}
              className="text-white font-bold text-5xl ml-5 p-4 pb-6 border w-fit">
              <p>Fun & Interactive</p>
              <p>Learning</p>
            </div>
            <div
              style={{ backgroundColor: '#7197C3' }}
              className="text-white m-5 p-4 w-fit">
              <p className="opacity-85">
                Engage with interactive flashcards and games designed
              </p>
              <p className="opacity-85">
                to make learning fun and effective for young learners
              </p>
            </div>
            <Link
              to="/sign-up"
              className="text-white p-2 self-center bg-red-500 hover:bg-[#f08a8a] inline-block">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageBody;
