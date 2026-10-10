import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-white/20 text-white backdrop-blur-md border border-white/30',
    primary: 'bg-amber-500 text-stone-950 font-bold',
    success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/30',
    dark: 'bg-black/40 text-white/90 backdrop-blur-sm border border-white/10',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider',
    md: 'text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider',
    lg: 'text-sm px-4 py-1.5 rounded-full font-bold',
  };

  return (
    <span className={`inline-flex items-center gap-1 select-none ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {children}
    </span>
  );
};
