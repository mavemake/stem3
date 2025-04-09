
import axios from 'axios';

const API_URL = '/api';

// Get user ID from local storage or generate a temporary one
export const getUserId = (): string => {
  let userId = localStorage.getItem('stem3_user_id');
  
  if (!userId) {
    // Generate a random user ID if none exists
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('stem3_user_id', userId);
  }
  
  return userId;
};

// Check if user has already submitted a testimonial
export const hasUserSubmittedTestimonial = async (userId: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/testimonials.php`);
    if (response.data.success && response.data.data) {
      return response.data.data.some((testimonial: any) => testimonial.user_id === userId);
    }
    return false;
  } catch (error) {
    console.error("Error checking testimonial status:", error);
    return false;
  }
};

// Upload testimonial with image
export const addTestimonial = async (name: string, text: string, image: File, userId: string) => {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('image', image);
    formData.append('userId', userId);
    
    const response = await axios.post(`${API_URL}/testimonials.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to save testimonial');
    }
    
    return response.data.data;
  } catch (error: any) {
    console.error("Error adding testimonial:", error);
    throw new Error(error.message || "Failed to save testimonial. Please try again.");
  }
};

// Get all testimonials
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API_URL}/testimonials.php`);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to load testimonials');
    }
    
    return response.data.data || [];
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    throw new Error(error.message || "Failed to load testimonials.");
  }
};
