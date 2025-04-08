
import React from 'react';

// Menu Item Component
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

// Menu data
const menuItems = [
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon, grilled to perfection, served with lemon butter sauce and seasonal vegetables.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Beef Wellington",
    description: "Tender filet mignon wrapped in layers of mushroom duxelles, prosciutto, and puff pastry.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
  },
  {
    name: "Truffle Risotto",
    description: "Creamy Arborio rice slowly cooked with white wine, finished with truffle oil and Parmesan cheese.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    name: "Chocolate Soufflé",
    description: "Light and airy chocolate soufflé served with vanilla bean ice cream and fresh berries.",
    image: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
  },
  {
    name: "Seafood Paella",
    description: "Traditional Spanish rice dish with assorted seafood, seasoned with saffron and herbs.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
  },
  {
    name: "Vegetable Tart",
    description: "Crisp pastry filled with roasted seasonal vegetables and goat cheese, served with green salad.",
    image: "https://images.unsplash.com/photo-1487376318617-f43c7b41e2e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="section bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center mb-16">Our Menu</h2>
        
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
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
