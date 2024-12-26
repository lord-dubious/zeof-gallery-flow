import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zeof-black text-white py-24">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-16">
          <div>
            <h3 className="font-serif text-2xl mb-6">House of Zeof</h3>
            <p className="text-gray-400 text-sm font-light tracking-wide">
              Crafting distinction for distinguished gentlemen since 1985.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300 text-sm tracking-wide">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300 text-sm tracking-wide">About</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300 text-sm tracking-wide">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300 text-sm tracking-wide">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="text-gray-400 space-y-4 text-sm tracking-wide font-light">
              <li>123 Luxury Avenue</li>
              <li>Fashion District</li>
              <li>contact@houseofzeof.com</li>
              <li>+1 234 567 8900</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Follow Us</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-zeof-gold transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-400 text-sm tracking-wide">&copy; {new Date().getFullYear()} House of Zeof. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;