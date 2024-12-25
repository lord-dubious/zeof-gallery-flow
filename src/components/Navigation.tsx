import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
        isScrolled || location.pathname !== "/" ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className={`text-2xl font-serif font-bold transition-colors ${
              isScrolled || location.pathname !== "/" ? "text-zeof-gold" : "text-white"
            } hover:opacity-80`}
          >
            ZEOF EXCLUZIONI
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden ${
              isScrolled || location.pathname !== "/" ? "text-zeof-black" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8">
            <NavLink to="/" isScrolled={isScrolled} currentPath={location.pathname}>
              Home
            </NavLink>
            <NavLink to="/about" isScrolled={isScrolled} currentPath={location.pathname}>
              About
            </NavLink>
            <NavLink to="/gallery" isScrolled={isScrolled} currentPath={location.pathname}>
              Gallery
            </NavLink>
            <NavLink to="/contact" isScrolled={isScrolled} currentPath={location.pathname}>
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 space-y-4">
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>
                Gallery
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

const NavLink = ({ 
  to, 
  children, 
  isScrolled, 
  currentPath 
}: { 
  to: string; 
  children: React.ReactNode;
  isScrolled: boolean;
  currentPath: string;
}) => (
  <Link
    to={to}
    className={`transition-colors duration-200 font-medium ${
      isScrolled || currentPath !== "/" 
        ? "text-zeof-black hover:text-zeof-gold" 
        : "text-white hover:text-zeof-gold"
    }`}
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