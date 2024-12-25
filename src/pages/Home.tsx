import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, Tech Solutions",
      content: "Chief Jideofor's vision and leadership have transformed our business relationship.",
    },
    {
      name: "Sarah Johnson",
      role: "Director, Global Ventures",
      content: "Working with Zeof Excluzioni has been an exceptional experience.",
    },
    {
      name: "Michael Chen",
      role: "Founder, Innovation Labs",
      content: "Their commitment to excellence is unmatched in the industry.",
    },
  ];

  const achievements = [
    {
      title: "Global Reach",
      description: "Operating in over 20 countries worldwide",
      icon: "🌍",
    },
    {
      title: "Innovation",
      description: "Pioneer in sustainable business practices",
      icon: "💡",
    },
    {
      title: "Excellence",
      description: "Multiple industry awards recipient",
      icon: "🏆",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-zeof-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Welcome to Zeof Excluzioni
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-zeof-cream mb-8 max-w-2xl mx-auto"
          >
            Discover the extraordinary journey of Chief Jideofor Ezeofor and his vision for excellence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/about">
              <Button className="bg-zeof-gold hover:bg-zeof-brown text-white px-8 py-6 text-lg">
                Explore Our Story <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-zeof-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif text-zeof-black mb-4">Vision</h3>
              <p className="text-gray-600">Leading with innovation and excellence in every endeavor.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif text-zeof-black mb-4">Mission</h3>
              <p className="text-gray-600">Creating lasting value through sustainable practices and community engagement.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif text-zeof-black mb-4">Values</h3>
              <p className="text-gray-600">Integrity, excellence, and commitment to positive change.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-b from-white to-zeof-cream">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-serif text-center text-zeof-black mb-12"
          >
            Our Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <CardTitle className="text-2xl font-serif">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-zeof-black text-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-serif text-center mb-12"
          >
            What Our Partners Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-none text-white h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">{testimonial.name}</CardTitle>
                    <CardDescription className="text-zeof-cream">{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-zeof-brown to-zeof-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-serif mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8">Join us in creating innovative solutions for a better future.</p>
            <Link to="/contact">
              <Button className="bg-white text-zeof-black hover:bg-zeof-cream px-8 py-6 text-lg">
                Get in Touch <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
