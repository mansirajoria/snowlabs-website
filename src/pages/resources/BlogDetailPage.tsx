import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Layout from '../../components/Layout'; // REMOVE LAYOUT
import Navbar from '../../components/Navbar'; // ADD NAVBAR
import Footer from '../../components/Footer'; // ADD FOOTER
import sanityClient from '../../sanityClient';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react'; // Icon for back link

// Interface for detailed Blog Post data
interface BlogPostDetail {
  _id: string;
  title?: string;
  slug?: { current?: string };
  author?: string;
  publishedAt?: string;
  mainImage?: { asset?: { url?: string, metadata?: { dimensions?: { aspectRatio?: number } } } }; // Include image URL and dimensions
  body?: any[]; // Portable Text content
}

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Blog post slug not found.");
      setLoading(false);
      return;
    }

    const query = `*[_type == "blog" && slug.current == $slug][0] { 
      _id,
      title,
      slug,
      author,
      publishedAt,
      mainImage { asset->{ url, metadata { dimensions } } },
      body
    }`;

    sanityClient.fetch(query, { slug })
      .then((data: BlogPostDetail) => {
        if (data) {
          setPost(data);
        } else {
          setError("Blog post not found.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blog post detail:", err);
        setError("Failed to load blog post.");
        setLoading(false);
      });

  }, [slug]);

  // Optional: Define custom components for PortableText rendering
  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?.url) return null;
        const aspectRatio = value.asset.metadata?.dimensions?.aspectRatio || 16/9;
        return (
          <img 
            src={value.asset.url} 
            alt={value.alt || 'Blog post image'} 
            loading="lazy"
            className="my-6 rounded-lg shadow-md max-w-full mx-auto"
            style={{ aspectRatio: `${aspectRatio}` }}
          />
        );
      },
      // Add handlers for other custom types if needed (e.g., code blocks)
    },
    // Optional: Customize marks (bold, italic, etc.) or block styles (h1, h2, etc.)
  };

  return (
    <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl"> 
        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading blog post...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {post && (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <Link 
              to="/resources/blogs"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 group"
            >
              <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blogs
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {post.title || 'Untitled Post'}
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 mb-6 text-sm">
              {post.author && <span>By {post.author}</span>}
              {post.author && post.publishedAt && <span>&bull;</span>}
              {post.publishedAt && <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>}
            </div>

            {/* Main Image */}
            {post.mainImage?.asset?.url && (
              <motion.img 
                src={post.mainImage.asset.url} 
                alt={post.title || 'Blog post image'} 
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
                style={{ aspectRatio: `${post.mainImage.asset.metadata?.dimensions?.aspectRatio || 16/9}` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            )}

            {/* Body Content */}
            {post.body && (
              <div className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-800 dark:text-gray-200">
                <PortableText 
                  value={post.body} 
                  components={portableTextComponents}
                />
              </div>
            )}
          </motion.article>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage; 