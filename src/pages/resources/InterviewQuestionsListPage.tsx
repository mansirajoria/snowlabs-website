import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout'; // REMOVE LAYOUT
import Navbar from '../../components/Navbar'; // ADD NAVBAR
import Footer from '../../components/Footer'; // ADD FOOTER
import sanityClient from '../../sanityClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Interface for Interview Question Set data (list view)
interface InterviewQuestionSet {
  _id: string;
  title?: string;
  slug?: { current?: string };
  introduction?: any[]; // Keep intro for potential excerpt display
  // Could add question count: "questionsCount": count(questionsList)
}

// Renamed component
const InterviewQuestionsListPage = () => { 
  const [questionSets, setQuestionSets] = useState<InterviewQuestionSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Query for all sets
    const query = `*[_type == "interviewQuestionSet"] | order(_createdAt desc) { 
      _id,
      title,
      slug,
      introduction
      // "questionsCount": count(questionsList)
    }`;

    sanityClient.fetch(query)
      .then((data: InterviewQuestionSet[]) => {
        setQuestionSets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching interview question sets:", err);
        setError("Failed to load interview question sets.");
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Basic PortableText to plain text excerpt function (customize as needed)
  const getExcerpt = (portableText: any[], maxLength = 150) => {
    if (!portableText) return '';
    let text = portableText
      .filter(block => block._type === 'block' && block.children)
      .map(block => block.children.map((span: { text: string }) => span.text).join(''))
      .join(' \n\n '); // Join blocks with paragraph breaks
    
    if (text.length > maxLength) {
      text = text.substring(0, maxLength).split(' ').slice(0, -1).join(' ') + '...';
    }
    return text;
  };

  return (
    // Remove Layout, Add wrapper div with padding and background
    <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Navbar />
      {/* Container remains, remove pt-20 from here if added previously */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Interview Questions
        </motion.h1>

        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading question sets...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && questionSets.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No interview question sets found.</p>
        )}

        {questionSets.length > 0 && (
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-1" // Changed to 1 column for sets
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {questionSets.map((set) => (
              set.slug?.current && (
                <motion.div 
                  key={set._id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      <Link 
                        to={`/resources/interview-questions/${set.slug.current}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {set.title || 'Untitled Set'}
                      </Link>
                    </h2>
                    {set.introduction && (
                       <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                         {getExcerpt(set.introduction)}
                       </p>
                    )}
                     <Link 
                      to={`/resources/interview-questions/${set.slug.current}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium mt-auto self-start"
                    >
                      View Questions &rarr;
                    </Link>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InterviewQuestionsListPage; // Export renamed component 