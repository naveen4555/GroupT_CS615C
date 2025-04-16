import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Home = () => {
  const mainFeatures = [
    {
      title: 'Stories',
      description: 'Create interactive and engaging stories with rich multimedia content. Use our powerful editor to bring your imagination to life with text, images, and collaborative features.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Workshops',
      description: 'Host live writing workshops and collaborative sessions. Connect with other writers in real-time, share feedback, and improve your storytelling skills together.',
      image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Communities',
      description: 'Build exclusive story communities by offering members-only access to your content, writing resources, and interactive discussion forums.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const features = [
    {
      icon: '📚',
      title: 'Interactive Stories',
      description: 'Create engaging stories with real-time collaboration and feedback.',
    },
    {
      icon: '👥',
      title: 'Community Building',
      description: 'Build a vibrant community around your stories and ideas.',
    },
    {
      icon: '🎮',
      title: 'Gamified Experience',
      description: 'Make storytelling fun with points, badges, and leaderboards.',
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'Access your stories from any device, anywhere.',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your stories are safe with our secure platform.',
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Track engagement and growth with detailed insights.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Writers' },
    { number: '50K+', label: 'Stories Created' },
    { number: '1M+', label: 'Readers Engaged' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'Story Tool has revolutionized how I create and share my stories. The community engagement is amazing!',
    },
    {
      name: 'Michael Chen',
      role: 'Team Lead',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The gamification features have made our team more engaged and productive than ever.',
    },
    {
      name: 'Emma Davis',
      role: 'Writer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'I love how easy it is to build a community around my stories. The analytics are incredibly helpful!',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 min-h-[90vh] rounded-b-[50px] md:rounded-b-[100px]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[50px] md:rounded-b-[100px]">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px), linear-gradient(to right, rgba(255, 255, 255, 0.1) 1.5px, transparent 1.5px)',
                 backgroundSize: '50px 50px',
                 opacity: 0.3
               }}
          />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 max-w-5xl mx-auto">
              Create Amazing Stories
              <br />
              Together.
            </h1>
            <p className="text-xl sm:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto">
              Write, Collaborate, and Share Stories with a Global Community. 
              Build Your Audience and Bring Your Stories to Life.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200 shadow-lg"
            >
              Start Writing Now
            </Link>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg text-indigo-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Image Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-contain bg-repeat-x rounded-b-[50px] md:rounded-b-[100px] overflow-hidden"
             style={{
               backgroundImage: 'url(https://www.tagmango.com/static/media/home-page-creators-strip.04daa7b….png)',
               backgroundPosition: 'bottom center',
               opacity: 0.1
             }}
        />
      </section>

      {/* What Writers Do Section */}
      <section className="py-20 bg-[#FDF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What writers do on Story App</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You Can Do</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build and grow your story community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Creators Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied creators building amazing communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-indigo-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-lg">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Creating?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of creators building amazing story communities.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;