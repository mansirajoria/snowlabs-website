import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TagIcon, ServerIcon, ShieldCheckIcon, BarChartIcon, ArrowRightCircle, ArrowRight, BookOpen, MailIcon, CalendarIcon, Clock, Users, Loader2, AlertCircle } from 'lucide-react'; // Added Loader2, AlertCircle
import AnimatedSection from './AnimatedSection';
import client from '../sanityClient'; // Import sanity client
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper
import { Pagination, A11y, Autoplay } from 'swiper/modules'; // Import Swiper modules

// Import Swiper styles (ensure these are imported globally or here)
import 'swiper/css';
import 'swiper/css/pagination';

// Helper function to generate slugs (simple version)
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Define structure based on user input
const categoryGroups = [
  {
    title: 'ServiceNow Trainings',
    slug: slugify('ServiceNow Trainings'),
    icon: <ServerIcon size={28} />,
    color: 'blue',
    description: 'Comprehensive ServiceNow courses covering ITSM, GRC, SecOps, and more.',
    exampleItems: [
      'IRM/GRC', 'ITSM', 'TPRM',
      'ITOM', 'ITBM', 'CSM',
      'HRSD', 'SecOps'
    ]
  },
  {
    title: 'ARCHER Trainings',
    slug: slugify('ARCHER Trainings'),
    icon: <ShieldCheckIcon size={28} />,
    color: 'red',
    description: 'Master RSA Archer for integrated risk management, including API usage.',
    exampleItems: ['RSA ARCHER Platform', 'Archer APIs']
  },
  {
    title: 'GRC Trainings',
    slug: slugify('GRC Trainings'),
    icon: <TagIcon size={28} />,
    color: 'green',
    description: 'Foundational and functional training in Governance, Risk, and Compliance.',
    exampleItems: ['GRC Core for Beginners', 'GRC Functional Deep Dive']
  },
  {
    title: 'SAP Trainings',
    slug: slugify('SAP Trainings'),
    icon: <BarChartIcon size={28} />,
    color: 'yellow',
    description: 'In-demand SAP skills across Finance, Logistics, HR, Analytics, and Administration.',
    exampleItems: [
      'SAP FICO', 'S/4HANA Finance', 'MM', 'SD', 'ABAP on HANA',
      'BASIS Admin', 'SuccessFactors', 'Ariba', 'SAC', 'EWM'
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] // Ease out cubic
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow on hover
    transition: { 
      duration: 0.3,
      type: "spring", // Use spring for a bouncier feel
      stiffness: 300,
      damping: 20
    }
  }
};

// New course item animation variants
const courseItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.03,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.97 }
};

// --- Define types for fetched upcoming training data ---
interface UpcomingTrainingCourse {
  _id: string;
  title: string;
  slug: { current: string };
  startDate?: string; // Make optional if data might be missing initially
  duration?: string;
  category?: {
    title: string;
    slug: string;
    // Determine color based on category title/slug if needed, or add color field to category schema
    icon?: React.ReactNode; // Placeholder for icon logic
    color?: string; // Placeholder for color logic
  };
}

// Updated animation variant for upcoming training cards (keep)
const upcomingCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -5,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const CourseCategoriesSection = () => {
  // State for upcoming trainings
  const [upcomingTrainings, setUpcomingTrainings] = useState<UpcomingTrainingCourse[]>([]);
  const [loadingTrainings, setLoadingTrainings] = useState(true);
  const [errorTrainings, setErrorTrainings] = useState<string | null>(null);

  // Fetch upcoming trainings on mount
  useEffect(() => {
    const fetchUpcomingTrainings = async () => {
      setLoadingTrainings(true);
      setErrorTrainings(null);
      try {
        const query = `*[_type == "course" && isUpcoming == true] | order(startDate asc) {
          _id,
          title,
          slug,
          startDate,
          duration,
          category->{title, "slug": slug.current}
        }`;
        const data = await client.fetch<UpcomingTrainingCourse[]>(query);
        setUpcomingTrainings(data);
      } catch (err) {
        console.error("Failed to fetch upcoming trainings:", err);
        setErrorTrainings("Failed to load upcoming trainings.");
      } finally {
        setLoadingTrainings(false);
      }
    };
    fetchUpcomingTrainings();
  }, []);

  // Dynamic color classes (more vibrant)
  const colorClasses: Record<string, { 
    bgGradient: string; 
    iconBg: string; 
    text: string; 
    border: string; 
    hoverRing: string;
    cardBg: string;
    cardBorder: string;
    cardHover: string;
  }> = {
    blue: { 
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/40', 
      iconBg: 'bg-blue-100 dark:bg-blue-800/40', 
      text: 'text-blue-600 dark:text-blue-300', 
      border: 'border-blue-200 dark:border-blue-800/50', 
      hoverRing: 'hover:ring-blue-400/50',
      cardBg: 'bg-white dark:bg-blue-900/20',
      cardBorder: 'border-blue-200/80 dark:border-blue-700/30',
      cardHover: 'hover:border-blue-400 dark:hover:border-blue-600/50 hover:shadow-blue-100 dark:hover:shadow-blue-900/30'
    },
    red: { 
      bgGradient: 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/40', 
      iconBg: 'bg-red-100 dark:bg-red-800/40', 
      text: 'text-red-600 dark:text-red-300', 
      border: 'border-red-200 dark:border-red-800/50', 
      hoverRing: 'hover:ring-red-400/50',
      cardBg: 'bg-white dark:bg-red-900/20', 
      cardBorder: 'border-red-200/80 dark:border-red-700/30',
      cardHover: 'hover:border-red-400 dark:hover:border-red-600/50 hover:shadow-red-100 dark:hover:shadow-red-900/30'
    },
    green: { 
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/40', 
      iconBg: 'bg-green-100 dark:bg-green-800/40', 
      text: 'text-green-600 dark:text-green-300', 
      border: 'border-green-200 dark:border-green-800/50', 
      hoverRing: 'hover:ring-green-400/50',
      cardBg: 'bg-white dark:bg-green-900/20',
      cardBorder: 'border-green-200/80 dark:border-green-700/30',
      cardHover: 'hover:border-green-400 dark:hover:border-green-600/50 hover:shadow-green-100 dark:hover:shadow-green-900/30'
    },
    yellow: { 
      bgGradient: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/40', 
      iconBg: 'bg-yellow-100 dark:bg-yellow-800/40', 
      text: 'text-yellow-600 dark:text-yellow-300', 
      border: 'border-yellow-200 dark:border-yellow-800/50', 
      hoverRing: 'hover:ring-yellow-400/50',
      cardBg: 'bg-white dark:bg-yellow-900/20',
      cardBorder: 'border-yellow-200/80 dark:border-yellow-700/30',
      cardHover: 'hover:border-yellow-400 dark:hover:border-yellow-600/50 hover:shadow-yellow-100 dark:hover:shadow-yellow-900/30'
    },
  };

  // Define a mapping or function to get icon/color based on fetched category title/slug
  const getCategoryVisuals = (categoryTitle?: string): { icon: React.ReactNode; color: string } => {
     // Basic example, refine as needed
     const lowerTitle = categoryTitle?.toLowerCase() || '';
     if (lowerTitle.includes('servicenow')) return { icon: <ServerIcon size={18} />, color: 'blue' };
     if (lowerTitle.includes('archer')) return { icon: <ShieldCheckIcon size={18} />, color: 'red' };
     if (lowerTitle.includes('grc')) return { icon: <TagIcon size={18} />, color: 'green' };
     if (lowerTitle.includes('sap')) return { icon: <BarChartIcon size={18} />, color: 'yellow' };
     return { icon: <BookOpen size={18} />, color: 'blue' }; // Default
  };

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Explore Course Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Dive into specialized training paths across leading platforms and methodologies.
          </p>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {categoryGroups.map((group) => {
            const colors = colorClasses[group.color] || colorClasses.blue;
            return (
              <div key={group.slug} className="flex flex-col h-full">
                <motion.div
                  className={`flex flex-col h-full p-6 rounded-xl border ${colors.border} bg-gradient-to-br ${colors.bgGradient} shadow-md dark:shadow-lg dark:shadow-black/20 hover:shadow-xl ${colors.hoverRing} overflow-hidden relative`}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* Category Header */}
                  <Link 
                    to={`/courses?category=${group.slug}`} 
                    className="block mb-5 group/header"
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 p-3 rounded-lg mr-4 ${colors.iconBg} ${colors.text}`}>
                        {group.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <h3 className={`text-xl font-semibold ${colors.text} dark:text-white group-hover/header:underline`}>
                            {group.title}
                          </h3>
                          <ArrowRight size={16} className="ml-2 opacity-0 group-hover/header:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                          {group.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Course Cards Grid - COMPLETELY REDESIGNED */}
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-300 mb-4 tracking-wider">
                      Popular Courses:
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {group.exampleItems.slice(0, 6).map((item, idx) => {
                        const courseSlug = slugify(item);
                        return (
                          <motion.div
                            key={item}
                            custom={idx} 
                            variants={courseItemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="relative"
                          >
                            <Link 
                              to={`/courses/${courseSlug}`}
                              className={`flex flex-col h-full p-3 rounded-lg border ${colors.cardBorder} ${colors.cardBg} ${colors.cardHover} hover:shadow-md transition-all duration-200 overflow-hidden relative group/course`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center mb-1.5">
                                <BookOpen size={15} className={`mr-2 ${colors.text} flex-shrink-0`} />
                                <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover/course:text-blue-600 dark:group-hover/course:text-blue-400 transition-colors">
                                  {item}
                                </h5>
                              </div>
                              <div className="mt-auto flex justify-end">
                                <span className={`text-xs ${colors.text} opacity-0 group-hover/course:opacity-100 transition-opacity flex items-center`}>
                                  View Course <ArrowRight size={12} className="ml-1" />
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {group.exampleItems.length > 6 && (
                      <Link 
                        to={`/courses?category=${group.slug}`}
                        className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mt-3 inline-block transition-colors hover:underline flex items-center"
                      >
                        + {group.exampleItems.length - 6} more courses
                        <ArrowRight size={10} className="ml-1" />
                      </Link>
                    )}
                  </div>
                  
                  {/* View All Courses Link */}
                  <div className="mt-5 pt-4 border-t border-gray-200/70 dark:border-gray-700/30">
                    <Link 
                      to={`/courses?category=${group.slug}`}
                      className={`text-sm ${colors.text} font-medium hover:underline flex items-center`}
                    >
                      View all {group.title}
                      <ArrowRightCircle size={17} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* New CTA Section */}
        <motion.div 
          className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0] 
          }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-24 -mr-24 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -mb-20 -ml-20 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Need Custom Training Solutions?</h3>
                <p className="text-blue-100 max-w-lg">
                  We offer tailored corporate training programs. Request more information about our courses or discuss custom solutions for your organization.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-700 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <MailIcon size={20} className="mr-2" />
                  <span>Request More Information</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Trainings Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Upcoming Trainings
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Secure your spot in our upcoming training sessions and advance your career
            </motion.p>
          </div>

          {/* Upcoming Trainings Display - Conditional Rendering for loading/error/empty */}
          {loadingTrainings && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={40} />
            </div>
          )}

          {!loadingTrainings && errorTrainings && (
            <div className="text-center py-10 px-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-lg">
              <AlertCircle className="mx-auto h-10 w-10 text-red-500 dark:text-red-400 mb-3" />
              <p className="text-red-700 dark:text-red-300 font-medium">Error loading upcoming trainings.</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errorTrainings}</p>
            </div>
          )}

          {!loadingTrainings && !errorTrainings && upcomingTrainings.length === 0 && (
            <div className="text-center py-10 px-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-lg">
              <CalendarIcon className="mx-auto h-10 w-10 text-yellow-600 dark:text-yellow-400 mb-3" />
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">No upcoming trainings scheduled currently.</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Please check back later or view all courses.</p>
            </div>
          )}

          {/* Display Grid/Carousel when data is loaded */}
          {!loadingTrainings && !errorTrainings && upcomingTrainings.length > 0 && (
            <div className="relative">
              {/* Desktop Grid (visible sm and up) */}
              <motion.div 
                className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {upcomingTrainings.map((training, index) => {
                  const visuals = getCategoryVisuals(training.category?.title);
                  const colors = colorClasses[visuals.color] || colorClasses.blue;
                  return (
                    <motion.div
                      key={training._id}
                      className={`relative`} 
                      custom={index}
                      variants={upcomingCardVariants}
                      whileHover="hover"
                    >
                      <Link 
                        to={`/courses/${training.slug.current}`}
                        className={`block h-full p-4 bg-white dark:bg-gray-900 border ${colors.cardBorder} rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
                      >
                        <div className={`text-xs uppercase font-semibold tracking-wider mb-2 ${colors.text} flex items-center`}>
                          {visuals.icon} 
                          <span className="ml-1.5">{training.category?.title || 'General'}</span>
                        </div>
                        
                        <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-tight mb-2 line-clamp-2" title={training.title}>{training.title}</h3>
                        
                        <div className="flex items-center mt-3 text-xs text-gray-600 dark:text-gray-400">
                          {training.startDate && (
                             <div className="flex items-center mr-3">
                               <CalendarIcon size={13} className="mr-1" />
                               <span>{new Date(training.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                             </div>
                           )}
                          {training.duration && (
                             <div className="flex items-center">
                               <Clock size={13} className="mr-1" />
                               <span>{training.duration}</span>
                             </div>
                          )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">
                            Enrolling Now
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                            View Details
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Mobile Carousel (hidden sm and up) */}
              <div className="sm:hidden -mx-4 px-4">
                <Swiper
                  modules={[Pagination, A11y, Autoplay]} // Include Autoplay if desired
                  spaceBetween={16}
                  slidesPerView={1.3} // Show slightly more than one card
                  pagination={{ clickable: true, dynamicBullets: true }}
                  grabCursor={true}
                  // Optional Autoplay - uncomment if needed
                  /*
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  */
                  className="pb-14" // Padding for pagination
                >
                  {upcomingTrainings.map((training, index) => {
                     const visuals = getCategoryVisuals(training.category?.title);
                     const colors = colorClasses[visuals.color] || colorClasses.blue;
                     return (
                       <SwiperSlide key={training._id} className="h-full pb-2"> {/* Add pb for potential shadow overflow */}
                         <motion.div
                            className={`h-full`} 
                            custom={index} // Use index for potential staggered animation if needed
                            variants={upcomingCardVariants} // Reuse card animation
                            whileHover="hover"
                          >
                            <Link 
                              to={`/courses/${training.slug.current}`}
                              className={`block h-full p-4 bg-white dark:bg-gray-900 border ${colors.cardBorder} rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
                             >
                              {/* Category + Icon */}
                              <div className={`text-xs uppercase font-semibold tracking-wider mb-2 ${colors.text} flex items-center`}>
                                {visuals.icon} 
                                <span className="ml-1.5">{training.category?.title || 'General'}</span>
                              </div>
                              {/* Title */}
                              <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-tight mb-2 line-clamp-2" title={training.title}>{training.title}</h3>
                              {/* Date & Duration */}
                              <div className="flex items-center mt-3 text-xs text-gray-600 dark:text-gray-400">
                                {training.startDate && (
                                   <div className="flex items-center mr-3">
                                     <CalendarIcon size={13} className="mr-1" />
                                     <span>{new Date(training.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                   </div>
                                 )}
                                {training.duration && (
                                   <div className="flex items-center">
                                     <Clock size={13} className="mr-1" />
                                     <span>{training.duration}</span>
                                   </div>
                                )}
                              </div>
                              {/* Footer: Status & Link text */}
                              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">
                                  Enrolling Now
                                </span>
                                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                  View Details
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                       </SwiperSlide>
                     );
                  })}
                </Swiper>
              </div>
            </div>
          )}

          {/* "View All Trainings" Link */}
          <div className="text-center mt-10">
            <Link 
              to="/courses" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View Complete Training Calendar
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseCategoriesSection; 