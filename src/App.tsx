
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme.tsx";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

// Nav and Footer
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Navigation />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navigation />
                <About />
                <Footer />
              </>
            } />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={
              <>
                <Navigation />
                <Contact />
                <Footer />
              </>
            } />
          </Routes>
        </Router>
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
