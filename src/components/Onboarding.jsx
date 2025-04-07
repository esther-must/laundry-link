import { Link } from "react-router-dom";
import washingMachineImg from '../assets/washing-machine.jpeg';

const Onboarding = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-white text-blue-600">
      <img src={washingMachineImg} alt="Laundry" className="w-80 h-80 mb-8" />
      <h2 className="text-2xl font-normal">Laundry Made Easy, Fresh Clothes, Zero Hassle!</h2>
      <p className="mt-2 text-xl">
        Pickup, Wash, Iron, & Deliver – All at Your Fingertips.
      </p>
      <Link to="/landing">
        <button className="mt-24 px-6 py-2 bg-white-600 text-blue-600 font-normal rounded-lg border-2 border-blue-500">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Onboarding;
