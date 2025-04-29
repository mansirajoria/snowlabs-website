import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Layout from '../../components/Layout'; // REMOVE LAYOUT
import Navbar from '../../components/Navbar'; // ADD NAVBAR
import Footer from '../../components/Footer'; // ADD FOOTER
import sanityClient from '../../sanityClient';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

// Reusing the interface from the original page, adjusting name slightly
interface InterviewQuestion {
  _key: string;
  question?: string;
  answer?: any[]; // Portable Text type
}

interface InterviewQuestionSetData {
  _id: string;
  title?: string;
  slug?: { current?: string };
  introduction?: any[]; // Portable Text type
  questionsList?: InterviewQuestion[];
}

const InterviewQuestionDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [setData, setSetData] = useState<InterviewQuestionSetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Interview question set slug not found.");
      setLoading(false);
      return;
    }

    // Fetch single set by slug
    const query = `*[_type == "interviewQuestionSet" && slug.current == $slug][0] { 
      _id,
      title,
      slug,
      introduction,
      questionsList[] { 
        _key,
        question,
        answer 
      }
    }`;

    sanityClient.fetch(query, { slug })
      .then((data: InterviewQuestionSetData) => {
        if (data) {
            setSetData(data);
        } else {
            setError("Interview question set not found.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching interview question set data:", err);
        setError("Failed to load interview question set.");
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
        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading interview questions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {setData && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Back Link */}
            <Link 
              to="/resources/interview-questions"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 group"
            >
              <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Interview Question Sets
            </Link>

            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white"
              variants={itemVariants}
            >
              {setData.title || 'Interview Questions'}
            </motion.h1>

            {setData.introduction && (
              <motion.div 
                className="prose dark:prose-invert max-w-none mb-8 text-lg text-gray-600 dark:text-gray-300"
                variants={itemVariants}
              >
                <PortableText value={setData.introduction} />
              </motion.div>
            )}

            {setData.questionsList && setData.questionsList.length > 0 ? (
              <motion.dl 
                className="space-y-8"
                variants={containerVariants} // Reuse container for staggered effect within list
              >
                {setData.questionsList.map((item, index) => (
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
                No interview questions found in this set.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InterviewQuestionDetailPage; 