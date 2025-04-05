import { useEffect, useState } from "react";
import axios from "axios";
import { FiLogOut, FiBell, FiCreditCard, FiUser, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { AiFillEdit, AiOutlineEyeInvisible } from "react-icons/ai";
import BottomNav from "../components/BottomNav";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/50");
  
  // User Data State
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/1", { signal: controller.signal });
        setUserData(res.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching user:", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading user data...</p>
      </div>
    );
  }  

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">User data is unavailable.</p>
      </div>
    );
  }

  // Handle File Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result;
        setProfilePic(imageUrl);  // Update local profilePic state
        setUserData(prev => ({ ...prev, profilePicture: imageUrl })); // Update userData state

        // Save to localStorage
        localStorage.setItem('profilePic', imageUrl);

        try {
          await axios.put("http://localhost:5000/users/1", { profilePicture: imageUrl });
        } catch (error) {
          console.error("Error uploading profile picture:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Input Change in Edit Modal
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/users/1", userData);
      alert("Profile updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };  

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("userToken");
        setTimeout(() => {
            navigate("/signin");
        }, 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile & Settings</h2>

      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 text-lg flex items-center gap-2">
          <FiArrowLeft size={20} /> <span className="font-semibold">Personal Info</span>
        </button>

        {/* Profile Picture */}
        <div className="relative">
          <img 
            src={userData.profilePicture || "https://via.placeholder.com/50"} 
            alt="Profile" 
            className="w-12 h-12 rounded-full border cursor-pointer"
            onClick={() => document.getElementById('fileInput').click()} 
          />
          {/* Hidden file input */}
          <input 
            type="file" 
            id="fileInput" 
            className="hidden" 
            onChange={handleImageUpload} 
          />
        </div>
      </div>

      {/* Edit Profile */}
      <button 
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold my-4 flex items-center justify-center gap-2"
        onClick={() => setShowEditModal(true)}
      >
        <AiFillEdit size={20} /> Edit Profile
      </button>

      {/* User Info */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold text-gray-500">Name</h2>
        <p className="text-lg font-medium">{userData.name}</p>

        <h2 className="text-md font-semibold text-gray-500 mt-4">E-Mail</h2>
        <p className="text-lg font-medium">{userData.email}</p>

        <h2 className="text-md font-semibold text-gray-500 mt-4">Phone</h2>
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium">{userData.phone}</p>
        </div>

        <h2 className="text-md font-semibold text-gray-500 mt-4">Location</h2>
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium">{userData.location}</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex items-center mt-4">
        <FiBell className="mr-2 text-gray-500" />
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={userData.notifications}
            onChange={() => setUserData({ ...userData, notifications: !userData.notifications })}
            className="mr-2"
          />
          Enable Notifications
        </label>
      </div>

      {/* Payment Methods */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
        <div className="flex items-center border p-2 rounded-md mt-2">
          <FiCreditCard className="mr-2 text-gray-500" />
          <span>**** **** **** 1234</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="mt-6 w-full bg-red-600 text-white p-2 rounded-lg flex items-center justify-center gap-2"
        onClick={handleLogout}
      >
        <FiLogOut />
        Logout
      </button>

      {/* Bottom Navigation */}
      <BottomNav active="profile" />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-500">
              <MdClose size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Profile</h2>

            <label className="block text-gray-600">Name</label>
            <input 
              type="text" 
              name="name"
              value={userData.name} 
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
            />

            <label className="block text-gray-600 mt-3">E-Mail</label>
            <input 
              type="email" 
              name="email"
              value={userData.email} 
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
            />

            <label className="block text-gray-600 mt-3">Phone</label>
            <input 
              type="text" 
              name="phone"
              value={userData.phone} 
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
            />

            <label className="block text-gray-600 mt-3">Location</label>
            <input 
              type="text" 
              name="location"
              value={userData.location} 
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
            />

            <button 
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 font-semibold"
                onClick={handleSave}
            >
                Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
