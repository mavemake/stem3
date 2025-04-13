
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Toast notification system
  const toastContainer = document.getElementById('toast-container');
  
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  }

  // User profile management
  const profileLoginSection = document.getElementById('profile-login');
  const profileInfoSection = document.getElementById('profile-info');
  const profileName = document.getElementById('profile-name');
  const nicknameForm = document.getElementById('nickname-form');
  const logoutBtn = document.getElementById('logout-btn');
  const profilePromptAlert = document.getElementById('profile-prompt-alert');
  const testimonialProfileAlert = document.getElementById('testimonial-profile-alert');
  const testimonialForm = document.getElementById('testimonial-form');
  
  // Check if user is logged in
  function checkUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.nickname) {
      // User is logged in
      if (profileLoginSection) profileLoginSection.classList.add('hidden');
      if (profileInfoSection) profileInfoSection.classList.remove('hidden');
      if (profileName) profileName.textContent = user.nickname;
      
      // Show testimonial form if on testimonials section
      if (testimonialProfileAlert) testimonialProfileAlert.classList.add('hidden');
      if (testimonialForm) testimonialForm.classList.remove('hidden');
      
      // Hide profile prompts
      if (profilePromptAlert) profilePromptAlert.classList.add('hidden');
      
      return true;
    } else {
      // User is not logged in
      if (profileLoginSection) profileLoginSection.classList.remove('hidden');
      if (profileInfoSection) profileInfoSection.classList.add('hidden');
      
      // Hide testimonial form if on testimonials section
      if (testimonialProfileAlert) testimonialProfileAlert.classList.remove('hidden');
      if (testimonialForm) testimonialForm.classList.add('hidden');
      
      // Show profile prompts
      if (profilePromptAlert) profilePromptAlert.classList.remove('hidden');
      
      return false;
    }
  }
  
  // Initialize user state
  checkUserLoggedIn();
  
  // Handle user login
  if (nicknameForm) {
    nicknameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nickname = document.getElementById('nickname').value.trim();
      
      if (nickname) {
        // Generate a unique user ID
        const userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify({ 
          nickname, 
          userId,
          createdAt: new Date().toISOString()
        }));
        
        showToast(`Welcome, ${nickname}!`, 'success');
        checkUserLoggedIn();
      }
    });
  }
  
  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      showToast('You have been signed out.', 'info');
      checkUserLoggedIn();
    });
  }
  
  // Gallery functionality
  const galleryUpload = document.getElementById('gallery-upload');
  const galleryGrid = document.getElementById('gallery-grid');
  const noImagesMessage = document.getElementById('no-images-message');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  // Load gallery images from localStorage
  function loadGallery() {
    const galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    
    if (galleryGrid) {
      if (galleryImages.length > 0) {
        noImagesMessage.classList.add('hidden');
        
        galleryGrid.innerHTML = '';
        galleryImages.forEach(image => {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';
          galleryItem.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
          
          galleryItem.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
              lightboxImg.src = image.src;
              lightbox.classList.remove('hidden');
            }
          });
          
          galleryGrid.appendChild(galleryItem);
        });
      } else {
        noImagesMessage.classList.remove('hidden');
      }
    }
  }
  
  // Initialize gallery
  loadGallery();
  
  // Handle gallery image upload
  if (galleryUpload) {
    galleryUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      
      if (!checkUserLoggedIn()) {
        // Prompt user to create profile
        showToast('Consider creating a profile first!', 'info');
        document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const imgSrc = event.target.result;
          
          // Save image to localStorage
          const galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
          galleryImages.push({
            id: Date.now(),
            src: imgSrc,
            alt: file.name,
            uploadedAt: new Date().toISOString()
          });
          
          localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
          
          // Reload gallery
          loadGallery();
          showToast('Image uploaded successfully!', 'success');
        };
        
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Handle lightbox close
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
    
    // Also close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
      }
    });
  }
  
  // Testimonials functionality
  const testimonialForm = document.getElementById('testimonial-form');
  const testimonialText = document.getElementById('testimonial-text');
  const testimonialImage = document.getElementById('testimonial-image');
  const testimonialsContainer = document.getElementById('testimonials-container');
  const loadingTestimonials = document.getElementById('loading-testimonials');
  const noTestimonials = document.getElementById('no-testimonials');
  
  // Load testimonials from API
  async function loadTestimonials() {
    if (!testimonialsContainer) return;
    
    try {
      loadingTestimonials.classList.remove('hidden');
      noTestimonials.classList.add('hidden');
      
      const response = await fetch('/testimonials');
      const result = await response.json();
      
      loadingTestimonials.classList.add('hidden');
      
      if (result.success && result.data && result.data.length > 0) {
        testimonialsContainer.innerHTML = '';
        
        result.data.forEach(testimonial => {
          const testimonialCard = document.createElement('div');
          testimonialCard.className = 'testimonial-card';
          
          let imageHtml = '';
          if (testimonial.image_url) {
            imageHtml = `<img src="/${testimonial.image_url}" alt="${testimonial.name}" class="testimonial-image">`;
          }
          
          testimonialCard.innerHTML = `
            <div class="testimonial-header">
              ${imageHtml}
              <h3 class="testimonial-name">${testimonial.name}</h3>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
          `;
          
          testimonialsContainer.appendChild(testimonialCard);
        });
      } else {
        noTestimonials.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      loadingTestimonials.classList.add('hidden');
      noTestimonials.classList.remove('hidden');
      showToast('Failed to load testimonials. Please try again later.', 'error');
    }
  }
  
  // Initialize testimonials
  loadTestimonials();
  
  // Handle testimonial submission
  if (testimonialForm) {
    testimonialForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.nickname || !user.userId) {
        showToast('Please create a profile first!', 'error');
        return;
      }
      
      const text = testimonialText.value.trim();
      if (!text) {
        showToast('Please enter your feedback!', 'error');
        return;
      }
      
      try {
        const formData = new FormData();
        formData.append('name', user.nickname);
        formData.append('text', text);
        formData.append('userId', user.userId);
        
        if (testimonialImage.files[0]) {
          formData.append('image', testimonialImage.files[0]);
        }
        
        const response = await fetch('/testimonials', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('Thank you for your testimonial!', 'success');
          testimonialForm.reset();
          loadTestimonials();
        } else {
          showToast(result.error || 'Failed to submit testimonial.', 'error');
        }
      } catch (error) {
        console.error('Error submitting testimonial:', error);
        showToast('Failed to submit testimonial. Please try again later.', 'error');
      }
    });
  }
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (name && email && message) {
        // In a real app, you'd send this to the server
        // For this demo, we'll just show a success message
        showToast('Your message has been sent!', 'success');
        contactForm.reset();
      } else {
        showToast('Please fill in all fields!', 'error');
      }
    });
  }
});
