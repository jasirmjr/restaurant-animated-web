import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 shadow-lg shadow-black/20 hover:shadow-xl',
    white: 'bg-white text-black hover:bg-stone-100 shadow-md hover:shadow-lg',
    outline: 'border-2 border-white/80 text-white hover:bg-white hover:text-black',
    ghost: 'text-white/80 hover:text-white hover:bg-white/10',
    amber: 'bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-amber-500/20 shadow-md',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-6 py-3 rounded-full gap-2',
    lg: 'text-base px-8 py-3.5 rounded-full gap-2.5 font-semibold tracking-wide',
    icon: 'p-2.5 rounded-full',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};
