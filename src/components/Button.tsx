import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  className = ''
}): JSX.Element => {
  const baseStyles: string = 'px-8 py-4 rounded-full text-lg font-semibold transition transform';

  const variantStyles: Record<ButtonProps['variant'], string> = {
    primary: 'bg-agro-lime hover:bg-lime-400 text-agro-green-dark hover:scale-105 shadow-lg',
    secondary: 'bg-agro-green hover:bg-agro-green-dark text-white hover:scale-105',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
    white: 'bg-white text-agro-green hover:bg-agro-cream hover:scale-105 shadow-lg',
  };

  const combinedClassName: string = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default Button;
