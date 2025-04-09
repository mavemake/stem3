import { auth } from './firebase';

// Get user ID from Firebase Auth or generate a temporary one
export const getUserId = (): string => {
  // If user is authenticated, use their UID
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }
  
  // Otherwise, use a temporary ID from localStorage
  let userId = localStorage.getItem('stem3_user_id');
  
  if (!userId) {
    // Generate a random user ID if none exists
    userId = 'temp_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('stem3_user_id', userId);
  }
  
  return userId;
};
