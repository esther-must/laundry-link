import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/home"); // Redirect after successful sign-up
    } catch (err) {
      let errorMessage = "Something went wrong!";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      }
      setErrors({ ...errors, firebase: errorMessage });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("Google user signed in:", user);
  
      // Navigate to home after successful sign-in
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    } finally {
      setGoogleLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-2 relative">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum of 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg pr-10"
              />
              <button type="button" className="absolute inset-y-0 right-2 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Minimum of 6 characters"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg pr-10"
              />
              <button type="button" className="absolute inset-y-0 right-2 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mr-2" />
              <p>By signing up, you agree to our <span className="text-blue-600 font-semibold">Terms of Service</span> and <span className="text-blue-600 font-semibold">Privacy Policy</span>.</p>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}
          </div>

          {errors.firebase && <p className="text-red-500 text-sm mb-2">{errors.firebase}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or continue with</div>

        <div className="flex justify-center mt-4">
            <button
                className="border p-3 rounded-full flex items-center justify-center bg-white shadow-md hover:shadow-lg"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle size={24} />
            </button>
        </div>

        <p className="text-center mt-4">
          Already have an account? <Link to="/signin" className="text-red-600 cursor-pointer">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
