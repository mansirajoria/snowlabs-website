import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon, UsersIcon, StarIcon, TrendingUpIcon, CheckIcon, BookOpenIcon, Loader2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import ContactForm from '../components/ContactForm';
import client from '../sanityClient';
import { PortableText } from '@portabletext/react';

interface SanityCourseDetail {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl: string;
  instructor?: string;
  duration?: string;
  difficulty?: string;
  students?: number;
  rating?: number;
  price?: number;
  category?: any;
  categoryName?: string;
  shortDescription?: string;
  longDescription?: any[];
  modules?: Array<{ _key: string; title: string; description?: string }>;
  testimonials?: Array<{ _key: string; quote: string; author: string }>;
}

const ptComponents = {
  types: {
    // You can add custom block types here if needed in the future
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600 dark:text-gray-400">{children}</blockquote>,
    normal: ({ children }: any) => <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>,
    // Add default heading handlers if needed, or rely on Prose
    // h4: ({children}: any) => <h4 className="text-lg font-semibold mt-5 mb-2">{children}</h4>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>, // Ensure font-bold is applied
    em: ({ children }: any) => <em className="italic">{children}</em>, // Ensure italic is applied
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
    // Add underline, strikethrough etc. if used in Sanity
    // underline: ({children}: any) => <span className="underline">{children}</span>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-4 ml-4">{children}</ul>, // Apply list styles
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-4 ml-4">{children}</ol>, // Apply list styles
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
  },
};

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<SanityCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Course slug is missing.');
      setLoading(false);
      return;
    }

    const fetchCourseDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "course" && slug.current == $slug][0]{ 
          _id,
          title,
          slug,
          "imageUrl": image.asset->url,
          instructor,
          duration,
          difficulty,
          students,
          rating,
          price,
          category,
          "categoryName": category->title,
          shortDescription,
          longDescription,
          modules[]{
            _key,
            title,
            description
          },
          testimonials[]{
            _key,
            quote,
            author
          }
        }`;
        const courseData = await client.fetch<SanityCourseDetail>(query, { slug });
        
        if (courseData) {
          setCourse(courseData);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        console.error('Failed to fetch course details:', err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full pt-40 pb-20 flex justify-center items-center min-h-screen bg-slate-50 dark:bg-gray-950">
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={48} />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Course Not Found</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            {error || "The course you're looking for doesn't exist or has been removed."}
          </p>
          <Button to="/courses" variant="primary" icon={<ArrowLeftIcon size={18} />} iconPosition="left">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-20 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                  <Link to="/courses" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Courses
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {course.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12 transition-colors duration-300">
          <div className="relative h-64 md:h-80">
            <img src={course.imageUrl || '/placeholder-image.jpg'} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {course.categoryName && (
                  <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    {course.categoryName}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {course.title}
                </h1>
                {course.instructor && (
                   <p className="text-lg text-gray-200">
                    Instructor: {course.instructor}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6 text-gray-600 dark:text-gray-400">
              {course.duration && (
                <div className="flex items-center">
                  <ClockIcon size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.difficulty && (
                <div className="flex items-center">
                  <TrendingUpIcon size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  <span className="capitalize">{course.difficulty}</span>
                </div>
              )}
              {course.students !== undefined && course.students !== null && (
                <div className="flex items-center">
                  <UsersIcon size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              )}
               {course.rating !== undefined && course.rating !== null && (
                <div className="flex items-center">
                  <StarIcon size={18} className="mr-2 text-yellow-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{course.rating.toFixed(1)}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">rating</span>
                </div>
              )}
            </div>
            <AnimatedSection>
              {course.shortDescription ? (
                 <div className="mb-6">
                   <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">About This Course</h2>
                   <p className="text-gray-700 dark:text-gray-300">{course.shortDescription}</p>
                 </div>
              ) : (
                 <div className="mb-6">
                   <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">About This Course</h2>
                   <p className="text-gray-700 dark:text-gray-300 italic">Brief description coming soon.</p>
                 </div>
              )}
              
              {course.price !== undefined && course.price !== null && (
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                  <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">
                    ₹{course.price.toFixed(2)}
                  </div>
                  <Button variant="primary" size="lg">
                    Enroll Now
                  </Button>
                </div>
               )}
            </AnimatedSection>
          </div>
        </div>

        {course.longDescription && course.longDescription.length > 0 && (
          <AnimatedSection className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-12 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Detailed Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <PortableText value={course.longDescription} components={ptComponents} />
            </div>
          </AnimatedSection>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
             {course.modules && course.modules.length > 0 && (
                <AnimatedSection className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 transition-colors duration-300">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Course Syllabus</h2>
                  <div className="space-y-6">
                    {course.modules.map((module, index) => (
                      <motion.div
                        key={module._key}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4">
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{module.title}</h3>
                        </div>
                         {module.description && (
                           <div className="p-4 prose dark:prose-invert max-w-none">
                              <PortableText value={module.description as any} components={ptComponents} />
                           </div>
                         )}
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
             )}
          </div>
          <div>
            <AnimatedSection direction="right">
              <ContactForm title="Interested in this course?" courseId={course._id} />
            </AnimatedSection>
          </div>
        </div>
        <AnimatedSection className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-12 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Why Take This Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Gain practical skills that are in high demand',
              'Learn from industry experts with real-world experience',
              'Work on hands-on projects to build your portfolio',
              'Get personalized feedback on your progress',
              'Get career counselling and job placement assistance',
              'Access course materials anytime, anywhere',
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start text-gray-700 dark:text-gray-300"
              >
                <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 flex-shrink-0">
                  <CheckIcon size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        {course.testimonials && course.testimonials.length > 0 && (
          <AnimatedSection className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col transition-colors duration-300"
                >
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-right">- {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}

      </div>
    </div>
  );
};

export default CourseDetail;