import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 font-sans';
  
  const variants = {
    primary: 'bg-secondary text-white hover:bg-secondary-dim',
    secondary: 'border-2 border-[#c6c6cd] bg-white text-[#0b1c30] hover:border-[#006a61] hover:text-[#006a61]',
  };
  
  const sizes = {
    sm: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    md: 'px-8 py-4 text-base rounded-2xl gap-2.5',
    lg: 'px-10 py-4 text-base rounded-2xl gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
}
