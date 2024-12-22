import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-serif font-bold text-zeof-gold hover:opacity-80 transition-opacity"
          >
            ZEOF EXCLUZIONI
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-zeof-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </MobileNavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-zeof-black hover:text-zeof-gold transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-zeof-black hover:text-zeof-gold transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

export default Navigation;