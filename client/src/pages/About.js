import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, CircleStackIcon, PaintBrushIcon, WindowIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Naveen',
      role: 'Developer',
      description: 'Full-stack developer with expertise in building scalable web applications and implementing complex features.',
      icon: CodeBracketIcon
    },
    {
      name: 'Raghul',
      role: 'Database Engineer',
      description: 'Database specialist focused on optimizing data structures and ensuring efficient data management.',
      icon: CircleStackIcon
    },
    {
      name: 'Divine',
      role: 'Designer',
      description: 'Creative designer crafting beautiful and intuitive user interfaces with attention to detail.',
      icon: PaintBrushIcon
    },
    {
      name: 'Mitali',
      role: 'Front End Developer',
      description: 'Frontend expert specializing in creating responsive and engaging user experiences.',
      icon: WindowIcon
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f4811f] to-[#ff9f4a] overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'linear-gradient(#ffffff 1.5px, transparent 1.5px), linear-gradient(to right, #ffffff 1.5px, transparent 1.5px)',
                 backgroundSize: '50px 50px',
                 opacity: 0.1
               }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About Story Tool
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're on a mission to revolutionize how people create and share stories together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To empower creators and teams to build engaging stories through seamless collaboration
                and innovative tools. We believe that the best stories are created together, and we're
                here to make that process as smooth and enjoyable as possible.
              </p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              initial={{ opacity: 0, x: 20 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the leading platform for collaborative storytelling, where creators from all
                backgrounds can come together to share their ideas and create something truly
                remarkable. We envision a world where storytelling is more accessible, engaging, and
                collaborative than ever before.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate people behind Story Tool
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`text-center p-8 rounded-xl shadow-lg transform transition-all duration-300
                  ${index === 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-blue-200' : ''}
                  ${index === 1 ? 'bg-gradient-to-br from-purple-50 to-pink-100 hover:shadow-purple-200' : ''}
                  ${index === 2 ? 'bg-gradient-to-br from-orange-50 to-amber-100 hover:shadow-orange-200' : ''}
                  ${index === 3 ? 'bg-gradient-to-br from-emerald-50 to-teal-100 hover:shadow-emerald-200' : ''}
                `}
              >
                <motion.div 
                  className="mx-auto w-16 h-16 mb-6"
                  transition={{ duration: 0.5 }}
                  whileHover={{ rotate: 360 }}
                >
                  <member.icon 
                    className={`w-full h-full transform transition-all duration-300
                      ${index === 0 ? 'text-indigo-600' : ''}
                      ${index === 1 ? 'text-purple-600' : ''}
                      ${index === 2 ? 'text-orange-600' : ''}
                      ${index === 3 ? 'text-emerald-600' : ''}
                    `}
                  />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{member.name}</h3>
                <p className={`text-lg font-medium mb-4
                  ${index === 0 ? 'text-indigo-600' : ''}
                  ${index === 1 ? 'text-purple-600' : ''}
                  ${index === 2 ? 'text-orange-600' : ''}
                  ${index === 3 ? 'text-emerald-600' : ''}
                `}>{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of working together and creating something greater than the sum of its parts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We're constantly pushing boundaries and exploring new ways to enhance the storytelling experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User-First</h3>
              <p className="text-gray-600">
                Everything we do is centered around providing the best possible experience for our users.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Story Tool</h3>
              <p className="text-gray-400">Creating amazing stories together.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/stories" className="text-gray-400 hover:text-white transition-colors">Stories</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@storytool.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Story Street, Fiction City, FC 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Story Tool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
