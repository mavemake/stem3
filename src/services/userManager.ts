
// Simple user ID manager using localStorage
export const getUserId = (): string => {
  let userId = localStorage.getItem('stem3_user_id');
  
  if (!userId) {
    // Generate a random user ID if none exists
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('stem3_user_id', userId);
  }
  
  return userId;
};
