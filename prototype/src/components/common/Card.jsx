export default function Card({
  children,
  variant = 'default',
  hover = false,
  className = '',
  ...props
}) {
  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-jm-border',
    elevated: 'bg-white shadow-jm-moderate',
    gradient: 'bg-gradient-jm text-white/95',
    subtle: 'bg-jm-gray-100',
  };

  // Hover effect
  const hoverStyles = hover ? 'hover:shadow-jm-pronounced transition-shadow duration-200' : '';

  const baseStyles = 'rounded-xl p-8';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
