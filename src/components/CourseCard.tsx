import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon, UsersIcon, StarIcon, TrendingUpIcon } from 'lucide-react';
import Button from './Button';

export interface CourseType {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  level: string;
  students: number;
  rating: number;
  price: number;
  category: string;
  tags: string[];
  featured?: boolean;
}

interface CourseCardProps {
  course: CourseType;
  featured?: boolean;
  index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  featured = false,
  index = 0
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-md overflow-hidden flex flex-col h-full 
                  ${featured ? 'border-2 border-blue-500 dark:border-blue-400' : 'border dark:border-gray-700'}
                  transition-colors duration-300`}
    >
      <div className="relative">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        {featured && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center text-white">
            <span className="text-sm font-semibold bg-blue-600 px-3 py-1 rounded-full">
              {course.category}
            </span>
          </div>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
            {course.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
            {course.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <ClockIcon size={14} className="mr-1 text-blue-600 dark:text-blue-400" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <TrendingUpIcon size={14} className="mr-1 text-blue-600 dark:text-blue-400" />
            {course.level}
          </div>
          <div className="flex items-center">
            <UsersIcon size={14} className="mr-1 text-blue-600 dark:text-blue-400" />
            {course.students.toLocaleString()} students
          </div>
          <div className="flex items-center">
            <StarIcon size={14} className="mr-1 text-yellow-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">{course.rating}</span> rating
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="font-bold text-lg text-gray-900 dark:text-white">${course.price.toFixed(2)}</div>
          <Button 
            to={`/courses/${course.slug}`} 
            size="sm" 
            variant={featured ? 'primary' : 'outline'}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;