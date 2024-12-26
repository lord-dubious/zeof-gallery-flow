import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zeof-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-2xl mb-4">House of Zeof</h3>
            <p className="text-gray-400 text-sm">
              Crafting distinction for distinguished gentlemen since 1985.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-zeof-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-zeof-gold transition-colors">About</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-zeof-gold transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-zeof-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <ul className="text-gray-400 space-y-2">
              <li>123 Luxury Avenue</li>
              <li>Fashion District</li>
              <li>contact@houseofzeof.com</li>
              <li>+1 234 567 8900</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-zeof-gold transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-zeof-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-zeof-gold transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} House of Zeof. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;