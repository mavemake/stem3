
import React from 'react';

// Program Item Component
const MenuItem = ({ name, description, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Program data
const menuItems = [
  {
    name: "Robotics Engineering",
    description: "Design, build, and program robots to solve real-world challenges using cutting-edge technology and collaborative problem-solving.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Data Science",
    description: "Learn to analyze complex datasets, create visualizations, and develop predictive models using statistics and programming.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Environmental Science",
    description: "Explore ecosystems, climate science, and sustainable solutions through field research and laboratory experiments.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Advanced Mathematics",
    description: "Deep dive into calculus, statistics, and discrete mathematics with real-world applications and problem-solving challenges.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Software Development",
    description: "Create applications, websites, and software solutions while learning programming languages and development methodologies.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Biomedical Engineering",
    description: "Combine biology, medicine, and engineering to develop innovative healthcare solutions and medical technologies.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="section bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-16">Our Programs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#contact" className="btn btn-secondary">
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
