import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, UserIcon, ArrowLeftIcon, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import client from '../../sanityClient';
import { PortableText } from '@portabletext/react';
import ReactPlayer from 'react-player/youtube'; // Import ReactPlayer for YouTube
import { format } from 'date-fns';
import Button from '../../components/Button';
import AnimatedSection from '../../components/AnimatedSection';

interface SanityWebinarDetail {
  _id: string;
  title: string;
  slug: { current: string };
  youtubeVideoUrl: string;
  publishedAt?: string;
  presenter?: string;
  description?: any[]; // Portable Text format
  tags?: string[];
}

// Define Portable Text components (can be moved to a shared file if reused elsewhere)
const ptComponents = {
  types: {
    // Define custom types here if needed
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400">{children}</blockquote>,
    normal: ({ children }: any) => <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded text-sm font-mono">{children}</code>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noindex nofollow' : undefined;
      return (
        <a href={value?.href} target={target} rel={rel} className="text-blue-600 dark:text-blue-400 hover:underline">
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-4 ml-4 text-gray-700 dark:text-gray-300">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-4 ml-4 text-gray-700 dark:text-gray-300">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

const WebinarDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [webinar, setWebinar] = useState<SanityWebinarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Webinar slug is missing.');
      setLoading(false);
      return;
    }

    const fetchWebinarDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "webinar" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          youtubeVideoUrl,
          publishedAt,
          presenter,
          description,
          tags
        }`;
        const data = await client.fetch<SanityWebinarDetail>(query, { slug });

        if (data) {
          setWebinar(data);
        } else {
          setError("Webinar not found.");
        }
      } catch (err) {
        console.error("Failed to fetch webinar details:", err);
        setError("Failed to load webinar details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinarDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex-grow pt-40 pb-20 flex justify-center items-center">
          <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950">
        <Navbar />
        <main className="flex-grow pt-28 pb-16 md:pb-24 px-4">
            <div className="container mx-auto max-w-4xl text-center py-10">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Webinar Not Found</h1>
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                    {error || "The webinar you're looking for doesn't exist or has been removed."}
                </p>
                <Button to="/resources/webinars" variant="primary" icon={<ArrowLeftIcon size={18} />} iconPosition="left">
                    Back to Webinars
                </Button>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 md:pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
            {/* Back Link */}
            <div className="mb-6">
                <Link 
                    to="/resources/webinars" 
                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    <ArrowLeftIcon size={16} className="mr-1" />
                    Back to all webinars
                </Link>
            </div>

            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 md:mb-10"
            >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    {webinar.title}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    {webinar.publishedAt && (
                        <span className="flex items-center">
                            <CalendarIcon size={14} className="mr-1.5" />
                            Published on {format(new Date(webinar.publishedAt), 'MMMM d, yyyy')}
                        </span>
                    )}
                    {webinar.presenter && (
                        <span className="flex items-center">
                            <UserIcon size={14} className="mr-1.5" />
                            Presented by {webinar.presenter}
                        </span>
                    )}
                </div>
            </motion.div>

            {/* YouTube Video Player */}
            <AnimatedSection className="mb-8 md:mb-12">
              <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                <ReactPlayer 
                  url={webinar.youtubeVideoUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  config={{
                      playerVars: { 
                        showinfo: 0, 
                        modestbranding: 1, 
                        rel: 0 
                      } 
                  }}
                />
              </div>
            </AnimatedSection>
            
            {/* Description */}
            {webinar.description && webinar.description.length > 0 && (
                <AnimatedSection 
                    direction="up" 
                    delay={0.2} 
                    className="prose dark:prose-invert max-w-none mt-8 text-gray-800 dark:text-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About this Webinar</h2>
                    <PortableText 
                        value={webinar.description} 
                        components={ptComponents} 
                    />
                </AnimatedSection>
            )}

             {/* Tags */}
             {webinar.tags && webinar.tags.length > 0 && (
                <AnimatedSection direction="up" delay={0.4} className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                    {webinar.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                    </div>
                </AnimatedSection>
            )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebinarDetailPage; 