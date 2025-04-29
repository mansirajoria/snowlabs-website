import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, CalendarIcon, Loader2 } from 'lucide-react'; // Using PlayIcon as it matches the schema
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedSection from '../../components/AnimatedSection';
import client from '../../sanityClient';
import { format } from 'date-fns'; // For formatting dates

interface SanityWebinarStub {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  featuredImageUrl?: string;
}

const WebinarsListPage = () => {
  const [webinars, setWebinars] = useState<SanityWebinarStub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "webinar"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          "featuredImageUrl": featuredImage.asset->url
        }`;
        const data = await client.fetch<SanityWebinarStub[]>(query);
        setWebinars(data);
      } catch (err) {
        console.error("Failed to fetch webinars:", err);
        setError("Failed to load webinars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Webinars
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Watch recordings of our past webinars covering various topics and insights.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600 dark:text-red-400">
              <p>{error}</p>
            </div>
          ) : webinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webinars.map((webinar, index) => (
                <motion.div
                  key={webinar._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/resources/webinars/${webinar.slug.current}`} 
                    className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full group"
                  >
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {webinar.featuredImageUrl ? (
                        <img src={webinar.featuredImageUrl} alt={webinar.title} className="w-full h-full object-cover" />
                      ) : (
                        <PlayIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                      )}
                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <PlayIcon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {webinar.title}
                      </h2>
                      {webinar.publishedAt && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                          <CalendarIcon size={14} className="mr-1.5" />
                          {format(new Date(webinar.publishedAt), 'MMMM d, yyyy')}
                        </p>
                      )}
                      {webinar.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                          {webinar.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No Webinars Yet</h2>
              <p className="text-gray-500 dark:text-gray-400">Check back soon for upcoming and recorded webinars!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebinarsListPage; 