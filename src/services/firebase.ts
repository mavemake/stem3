
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnxNeLxxTGu4V9acQXUZ6ZCPP-3a87t80",
  authDomain: "stem-3-84339.firebaseapp.com",
  projectId: "stem-3-84339",
  storageBucket: "stem-3-84339.firebasestorage.app",
  messagingSenderId: "506383716289",
  appId: "1:506383716289:web:33e18a4d9678e4a8b4a940"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Collection references
export const testimonialsCollection = collection(db, 'testimonials');

// Upload testimonial image to Firebase Storage
export const uploadTestimonialImage = async (file: File, userId: string): Promise<string> => {
  const storageRef = ref(storage, `testimonials/${userId}_${Date.now()}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Add testimonial to Firestore
export const addTestimonial = async (name: string, text: string, imageUrl: string, userId: string) => {
  return addDoc(testimonialsCollection, {
    name,
    text,
    imageUrl,
    userId,
    createdAt: new Date()
  });
};

// Check if user has already submitted a testimonial
export const hasUserSubmittedTestimonial = async (userId: string): Promise<boolean> => {
  const q = query(testimonialsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Get all testimonials
export const getTestimonials = async () => {
  const querySnapshot = await getDocs(testimonialsCollection);
  const testimonials: any[] = [];
  
  querySnapshot.forEach((doc) => {
    testimonials.push({ id: doc.id, ...doc.data() });
  });
  
  return testimonials;
};
