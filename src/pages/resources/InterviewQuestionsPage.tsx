import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import sanityClient from '../../sanityClient'; // Import the client
import { PortableText } from '@portabletext/react'; // Import PortableText
import { motion } from 'framer-motion';

// Define interfaces for the fetched data based on the schema
interface InterviewQuestion {
  _key: string;
  question?: string;
  answer?: any[]; // Portable Text type
}

interface InterviewQuestionsPageData {
  _id: string;
  title?: string;
  introduction?: any[]; // Portable Text type
  questionsList?: InterviewQuestion[];
}

const InterviewQuestionsPage = () => {
  const [pageData, setPageData] = useState<InterviewQuestionsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = `*[_type == "interviewQuestionsPage"][0] { 
      _id,
      title,
      introduction,
      questionsList[] { 
        _key,
        question,
        answer 
      }
    }`;

    sanityClient.fetch(query)
      .then((data: InterviewQuestionsPageData) => {
        setPageData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching interview questions page data:", err);
        setError("Failed to load interview questions.");
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
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading interview questions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {pageData && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white"
              variants={itemVariants}
            >
              {pageData.title || 'Interview Questions'}
            </motion.h1>

            {pageData.introduction && (
              <motion.div 
                className="prose dark:prose-invert max-w-none mb-8 text-lg text-gray-600 dark:text-gray-300"
                variants={itemVariants}
              >
                <PortableText value={pageData.introduction} />
              </motion.div>
            )}

            {pageData.questionsList && pageData.questionsList.length > 0 ? (
              <motion.dl 
                className="space-y-8"
                variants={containerVariants} // Reuse container for staggered effect within list
              >
                {pageData.questionsList.map((item, index) => (
                  <motion.div 
                    key={item._key || index} 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <dt className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {index + 1}. {item.question}
                    </dt>
                    <dd className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                      {item.answer ? <PortableText value={item.answer} /> : <p>No answer provided.</p>}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>
            ) : (
              <motion.p 
                className="text-center text-gray-500 dark:text-gray-400"
                variants={itemVariants}
              >
                No interview questions found.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default InterviewQuestionsPage; 