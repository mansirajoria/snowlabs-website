import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout'; // REMOVE LAYOUT
import Navbar from '../../components/Navbar'; // ADD NAVBAR
import Footer from '../../components/Footer'; // ADD FOOTER
import sanityClient from '../../sanityClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns'; // For formatting dates

// Interface for Blog Post data
interface BlogPost {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  publishedAt?: string;
  // Add mainImage later if needed for list view
}

const BlogsListPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = `*[_type == "blog"] | order(publishedAt desc) { 
      _id,
      title,
      slug,
      excerpt,
      publishedAt
      // "imageUrl": mainImage.asset->url // Example if image needed
    }`;

    sanityClient.fetch(query)
      .then((data: BlogPost[]) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts.");
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
    <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Blog
        </motion.h1>

        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading blog posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && blogPosts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No blog posts found.</p>
        )}

        {blogPosts.length > 0 && (
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              post.slug?.current && (
                <motion.div 
                  key={post._id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Add image here if needed */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      <Link 
                        to={`/resources/blogs/${post.slug.current}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title || 'Untitled Post'}
                      </Link>
                    </h2>
                    {post.publishedAt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {post.excerpt || 'No summary available.'}
                    </p>
                    <Link 
                      to={`/resources/blogs/${post.slug.current}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium mt-auto self-start"
                    >
                      Read More &rarr;
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

export default BlogsListPage; 