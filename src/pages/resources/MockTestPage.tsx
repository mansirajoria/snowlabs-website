import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout'; // REMOVE LAYOUT
import Navbar from '../../components/Navbar'; // ADD NAVBAR
import Footer from '../../components/Footer'; // ADD FOOTER
import sanityClient from '../../sanityClient';
import { Link } from 'react-router-dom'; // Uncomment Link
import { motion } from 'framer-motion';

// Interface for Mock Test data
interface MockTest {
  _id: string;
  title?: string;
  slug?: { current?: string };
  description?: string;
  // questions count could be added later: "questionsCount": count(questions)
}

const MockTestPage = () => {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = `*[_type == "mockTest"] | order(_createdAt desc) { // Added ordering
      _id,
      title,
      slug,
      description
      // "questionsCount": count(questions)
    }`;

    sanityClient.fetch(query)
      .then((data: MockTest[]) => {
        setMockTests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching mock tests:", err);
        setError("Failed to load mock tests.");
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
          Mock Tests
        </motion.h1>

        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading mock tests...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && mockTests.length === 0 && (
          <motion.div 
             className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.3 }}
           >
             <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Coming Soon!</h2>
             <p className="text-gray-500 dark:text-gray-400">
               We're preparing mock tests to help you ace your interviews. Check back later!
             </p>
          </motion.div>
        )}

        {mockTests.length > 0 && (
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" // Kept grid layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {mockTests.map((test) => (
              test.slug?.current && ( // Ensure slug exists before rendering card
                <motion.div 
                  key={test._id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6 flex-grow flex flex-col">
                     <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {/* Use Link for title */}
                        <Link 
                          to={`/resources/mock-test/${test.slug.current}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {test.title || 'Untitled Test'}
                        </Link>
                     </h2>
                     <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                       {test.description || 'No description available.'}
                     </p>
                    {/* Use Link for button/link */}
                     <Link 
                       to={`/resources/mock-test/${test.slug.current}`}
                       className="text-blue-600 dark:text-blue-400 hover:underline font-medium mt-auto self-start"
                     >
                       View Test &rarr;
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

export default MockTestPage; 