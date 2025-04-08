
import React, { useState } from 'react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Message sent! We\'ll get back to you soon.', {
      duration: 3000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="section bg-light">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-16">Contact Us</h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-dark text-white p-8">
              <h3 className="text-2xl mb-6">Get in Touch</h3>
              <p className="mb-6">
                We'd love to hear from you. Drop us a message or give us a call to make reservations or inquiries.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-orange font-semibold mb-1">Address</h4>
                  <p>123 Gourmet Street, Culinary District, CA 12345</p>
                </div>
                
                <div>
                  <h4 className="text-orange font-semibold mb-1">Phone</h4>
                  <p>(123) 456-7890</p>
                </div>
                
                <div>
                  <h4 className="text-orange font-semibold mb-1">Email</h4>
                  <p>info@culinarydelights.com</p>
                </div>
                
                <div>
                  <h4 className="text-orange font-semibold mb-1">Hours</h4>
                  <p>Mon-Fri: 5pm-11pm</p>
                  <p>Sat-Sun: 12pm-11pm</p>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="mailto:developer@example.com" 
                  className="inline-block text-white hover:text-orange transition-colors"
                >
                  Contact the Dev
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
