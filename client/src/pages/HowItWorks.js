import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilIcon, UserGroupIcon, ShareIcon } from '@heroicons/react/24/outline';
import Footer from '../components/Footer';

const HowItWorks = () => {
  const steps = [
    {
      icon: <BookOpenIcon className="h-8 w-8 text-blue-500" />,
      title: "Create Your Story",
      description: "Start by creating a new story with a title and main text. Add tags to help others find your story."
    },
    {
      icon: <PencilIcon className="h-8 w-8 text-blue-500" />,
      title: "Add Snapshots",
      description: "Create snapshots of important events in your story. Add links to resources for additional context."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8 text-blue-500" />,
      title: "Collaborate",
      description: "Invite others to contribute to your story. Only one person can edit at a time to maintain consistency."
    },
    {
      icon: <ShareIcon className="h-8 w-8 text-blue-500" />,
      title: "Share & View",
      description: "Share your story with the community. View and learn from other stories."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">How StoryCollab Works</h1>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/register"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;