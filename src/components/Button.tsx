import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all rounded-lg';
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-5 py-2.5',
    lg: 'text-lg px-6 py-3'
  };
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 hover:underline'
  };
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;
  const content = <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>;
  const motionProps = {
    whileHover: {
      scale: disabled ? 1 : 1.03
    },
    whileTap: {
      scale: disabled ? 1 : 0.98
    },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  };
  if (to) {
    return <motion.div {...motionProps}>
        <Link to={to} className={buttonClasses}>
          {content}
        </Link>
      </motion.div>;
  }
  if (href) {
    return <motion.div {...motionProps}>
        <a href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </motion.div>;
  }
  return <motion.button type={type} className={buttonClasses} onClick={onClick} disabled={disabled} {...motionProps}>
      {content}
    </motion.button>;
};
export default Button;