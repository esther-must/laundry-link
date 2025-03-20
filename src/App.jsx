import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import BookingsPage from "./pages/BookingsPage";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import Onboarding from "./components/Onboarding";

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navigation */}
        {/* <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500 font-semibold">🏠 Home</Link>
          <Link to="/bookings" className="text-blue-500 font-semibold">📌 Bookings</Link>
        </nav> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<SignUp />} />
         <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
