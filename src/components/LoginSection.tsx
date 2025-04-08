
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoginSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [userData, setUserData] = useState({
    nickname: '',
    profilePicture: null,
    testimonial: '',
  });

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation
    if (loginData.username && loginData.password) {
      // In a real app, validate with backend
      setIsLoggedIn(true);
      setShowLoginForm(false);
      toast.success('Login successful!');
    } else {
      toast.error('Please enter both username and password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    setUserData({
      nickname: '',
      profilePicture: null,
      testimonial: '',
    });
    toast.info('Logged out successfully');
  };

  const handleUserDataChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({
          ...userData,
          profilePicture: event.target.result,
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const saveUserProfile = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success('Profile updated successfully!');
  };
  
  const submitTestimonial = (e) => {
    e.preventDefault();
    if (userData.testimonial) {
      toast.success('Your testimonial has been submitted!');
      console.log('Testimonial submitted:', userData.testimonial);
      setUserData({
        ...userData,
        testimonial: '', // Reset testimonial
      });
    } else {
      toast.error('Please enter your testimonial');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* User Icon Button */}
      <button
        onClick={toggleLoginForm}
        className="w-14 h-14 rounded-full bg-orange text-white flex items-center justify-center shadow-lg hover:bg-dark transition-colors"
      >
        <User size={24} />
      </button>

      {/* Login/Profile Modal */}
      {showLoginForm && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl p-6 animate-scale-in">
          {!isLoggedIn ? (
            <>
              <h3 className="text-2xl mb-4">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none"
                >
                  Login
                </button>
              </form>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl">Your Profile</h3>
                <button
                  onClick={handleLogout}
                  className="text-sm text-orange hover:underline"
                >
                  Logout
                </button>
              </div>

              <form onSubmit={saveUserProfile} className="mb-6">
                <div className="flex flex-col items-center mb-4">
                  <div 
                    className={cn(
                      "w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center overflow-hidden",
                      userData.profilePicture ? "" : "border-2 border-dashed border-gray-400"
                    )}
                  >
                    {userData.profilePicture ? (
                      <img 
                        src={userData.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-gray-400" />
                    )}
                  </div>
                  <label className="cursor-pointer text-sm text-orange hover:underline">
                    {userData.profilePicture ? 'Change Picture' : 'Upload Picture'}
                    <input
                      type="file"
                      name="profilePicture"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUserDataChange}
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <label htmlFor="nickname" className="block text-gray-700 mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={userData.nickname}
                    onChange={handleUserDataChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    placeholder="How should we call you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-dark text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none"
                >
                  Save Profile
                </button>
              </form>

              {/* Testimonial Form */}
              <div>
                <h4 className="text-lg font-medium mb-2">Share Your Experience</h4>
                <form onSubmit={submitTestimonial}>
                  <textarea
                    name="testimonial"
                    value={userData.testimonial}
                    onChange={handleUserDataChange}
                    className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange mb-3"
                    rows={3}
                    placeholder="Tell us about your experience..."
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-orange text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none"
                  >
                    Submit Testimonial
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginSection;
