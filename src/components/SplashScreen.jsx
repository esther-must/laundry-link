import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from '../assets/logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding"); // Navigate to onboarding page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-600">
      <div className="text-center">
        <img src={logoImg} alt="LaundryLink Logo" className="w-16 mx-auto" />
        <h1 className="text-white text-2xl font-bold mt-4">LAUNDRYLINK</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
