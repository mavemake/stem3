
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUserId, hasUserSubmittedTestimonial } from '@/services/testimonialService';

const LoginSection = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userData, setUserData] = useState({
    nickname: '',
    profilePicture: null,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{nickname: string, uid: string} | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('stem3_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
      
      // Check if user has submitted a testimonial
      const checkSubmissionStatus = async () => {
        try {
          const userId = getUserId();
          const submitted = await hasUserSubmittedTestimonial(userId);
          setHasSubmitted(submitted);
        } catch (error) {
          console.error("Error checking testimonial status:", error);
        }
      };
      
      // Load user profile data
      const loadUserProfile = () => {
        const storedProfile = localStorage.getItem(`profile_${user.uid}`);
        if (storedProfile) {
          setUserData(JSON.parse(storedProfile));
        } else if (user.nickname) {
          // Set default nickname
          setUserData({
            ...userData,
            nickname: user.nickname
          });
        }
      };
      
      checkSubmissionStatus();
      loadUserProfile();
    }
  }, []);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!nickname.trim()) {
        throw new Error('Please enter a nickname');
      }
      
      // Simple user creation with just a nickname
      const uid = 'user_' + Math.random().toString(36).substring(2, 15);
      const user = { 
        nickname: nickname, 
        uid: uid
      };
      
      localStorage.setItem('stem3_user', JSON.stringify(user));
      localStorage.setItem('stem3_user_id', uid);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setUserData({
        ...userData,
        nickname: nickname
      });
      
      toast.success('Profile created successfully!');
      setShowLoginForm(false);
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error(error.message || 'Failed to create profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      // Don't remove user ID needed for testimonials
      localStorage.removeItem('stem3_user');
      setCurrentUser(null);
      setIsLoggedIn(false);
      toast.info('Logged out successfully');
      setShowLoginForm(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to log out. Please try again.');
    }
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
    if (currentUser) {
      // Save to localStorage with user ID
      localStorage.setItem(`profile_${currentUser.uid}`, JSON.stringify(userData));
      toast.success('Profile updated successfully!');
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

      {/* Profile Modal */}
      {showLoginForm && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl p-6 animate-scale-in">
          {!currentUser ? (
            <>
              <h3 className="text-2xl mb-4">Create Your Profile</h3>
              <form onSubmit={handleCreateProfile}>
                <div className="mb-4">
                  <label htmlFor="nickname" className="block text-gray-700 mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                    placeholder="How should we call you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-orange text-white py-2 rounded-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'} transition-colors focus:outline-none`}
                >
                  {isLoading ? 'Creating...' : 'Create Profile'}
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

              <div className="mb-2">
                <span className="text-sm text-gray-600">Logged in as: {currentUser.nickname}</span>
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

              {/* Testimonial Status */}
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                {hasSubmitted ? (
                  <p className="text-green-600">You have already submitted a testimonial. Thank you!</p>
                ) : (
                  <p className="text-blue-600">You can add your testimonial in the testimonials section below.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginSection;
