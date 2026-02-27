import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-jm hover:bg-gradient-jm-hover text-white shadow-sm hover:shadow-md',
    secondary: 'border-2 border-jm-purple-deep hover:border-jm-purple-dark text-jm-purple-deep hover:text-jm-purple-dark hover:bg-jm-purple-deep/5',
    outline: 'border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50',
    ghost: 'text-jm-purple-deep hover:bg-jm-purple-deep/10',
  };

  // Size styles
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const baseStyles = 'font-sans font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2 inline-block text-center transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // If it's a link (internal routing)
  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  // If it's an external link
  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  // If it's a button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
}
