import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-6">
      <h1 className="text-blue-500 text-3xl font-normal mb-32">Welcome!</h1>
      <Link to="/signup">
        <button className="w-48 py-2 mb-6 bg-blue-500 text-white rounded-md shadow-md">
          Sign Up
        </button>
      </Link>
      <Link to="/signin">
        <button className="w-48 py-2 border border-blue-500 text-blue-500 rounded-md shadow-md">
          Log In
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
