import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Layout from '../../components/Layout'; // REMOVE LAYOUT
import Navbar from '../../components/Navbar'; // ADD NAVBAR
import Footer from '../../components/Footer'; // ADD FOOTER
import sanityClient from '../../sanityClient';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

// Interfaces based on mockTest and mockTestQuestion schemas
interface MockTestOption {
  _key: string;
  text?: string;
  isCorrect?: boolean;
}

interface MockTestQuestionData {
  _key: string;
  questionText?: string;
  options?: MockTestOption[];
  explanation?: any[]; // Portable Text type
}

interface MockTestData {
  _id: string;
  title?: string;
  slug?: { current?: string };
  description?: string;
  instructions?: any[]; // Portable Text type
  questions?: MockTestQuestionData[];
}

const MockTestDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [testData, setTestData] = useState<MockTestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Mock test slug not found.");
      setLoading(false);
      return;
    }

    // Fetch single test by slug, including questions and options
    const query = `*[_type == "mockTest" && slug.current == $slug][0] { 
      _id,
      title,
      slug,
      description,
      instructions,
      questions[] { 
        _key,
        questionText,
        explanation,
        options[] { 
            _key,
            text,
            isCorrect
        }
      }
    }`;

    sanityClient.fetch(query, { slug })
      .then((data: MockTestData) => {
        if (data) {
          setTestData(data);
        } else {
          setError("Mock test not found.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching mock test data:", err);
        setError("Failed to load mock test.");
        setLoading(false);
      });

  }, [slug]);

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
        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading mock test...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {testData && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
             {/* Back Link */}
            <Link 
              to="/resources/mock-test"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 group"
            >
              <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Mock Tests
            </Link>

            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white"
              variants={itemVariants}
            >
              {testData.title || 'Mock Test'}
            </motion.h1>

            {testData.description && (
                <motion.p 
                    className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    {testData.description}
                </motion.p>
            )}

            {testData.instructions && (
              <motion.div 
                className="prose dark:prose-invert max-w-none mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800"
                variants={itemVariants}
              >
                <h2 className="text-xl font-semibold !mt-0">Instructions</h2>
                <PortableText value={testData.instructions} />
              </motion.div>
            )}

            {/* Render Questions (Read-only display) */}
            {testData.questions && testData.questions.length > 0 ? (
              <motion.div 
                className="space-y-8"
                variants={containerVariants}
              >
                {testData.questions.map((question, index) => (
                  <motion.div 
                    key={question._key || index} 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      Question {index + 1}: {question.questionText}
                    </p>
                    <div className="space-y-3 mb-4">
                      {question.options?.map(option => (
                        <div 
                          key={option._key}
                          className={`flex items-center p-3 rounded border text-sm 
                            ${option.isCorrect 
                              ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200' 
                              : 'bg-gray-50 dark:bg-gray-700/30 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
                        >
                          {option.isCorrect ? 
                           <CheckCircle size={16} className="mr-2 flex-shrink-0 text-green-600 dark:text-green-400" /> : 
                           <XCircle size={16} className="mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                          }
                          <span>{option.text}</span>
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 prose dark:prose-invert prose-sm max-w-none text-gray-600 dark:text-gray-300">
                            <p className="font-semibold text-gray-800 dark:text-gray-100">Explanation:</p>
                            <PortableText value={question.explanation} />
                        </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p 
                className="text-center text-gray-500 dark:text-gray-400"
                variants={itemVariants}
              >
                No questions found for this mock test.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
       <Footer />
    </div>
  );
};

export default MockTestDetailPage; 