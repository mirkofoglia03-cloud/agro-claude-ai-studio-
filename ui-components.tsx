import React from 'react';

// ========================================
// COMPONENTI UI BASE RIUTILIZZABILI
// Design System AgroIO
// ========================================

// Tipi per i componenti
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'beige' | 'white' | 'green' | 'green-dark';
  spacing?: 'sm' | 'md' | 'lg';
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// ========================================
// BOTTONE COMPONENTE
// ========================================
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  // Classi base
  const baseClasses = 'font-sans font-semibold rounded-button transition-all duration-300 ease-in-out inline-flex items-center justify-center';

  // Varianti di stile
  const variantClasses = {
    primary: 'bg-arancione-cta text-white hover:bg-[#d4956b] hover:-translate-y-0.5 hover:shadow-lg',
    secondary: 'bg-transparent text-verde-principale border-2 border-verde-principale hover:bg-verde-principale hover:text-white hover:-translate-y-0.5',
    text: 'bg-transparent text-verde-principale hover:text-verde-scuro underline-offset-4 hover:underline',
  };

  // Dimensioni
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  // Larghezza piena
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ========================================
// CARD COMPONENTE
// ========================================
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-10',
  };

  const hoverClass = hover
    ? 'hover:-translate-y-1 hover:shadow-xl'
    : '';

  return (
    <div className={`bg-white rounded-card shadow-card transition-all duration-300 ease-in-out ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

// ========================================
// ICONA COMPONENTE (Material Icons)
// ========================================
export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <span className={`material-icons ${sizeClasses[size]} ${className}`}>
      {name}
    </span>
  );
};

// ========================================
// INPUT COMPONENTE
// ========================================
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-grigio-scuro font-medium mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-grigio-scuro
          focus:outline-none focus:border-verde-principale focus:ring-2 focus:ring-verde-principale/20
          transition-all duration-300 ease-in-out
          ${error ? 'border-red-500' : ''}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-grigio-medio">{helperText}</p>
      )}
    </div>
  );
};

// ========================================
// SEZIONE COMPONENTE
// ========================================
export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'beige',
  spacing = 'lg',
}) => {
  const bgClasses = {
    beige: 'bg-beige-crema',
    white: 'bg-white',
    green: 'bg-verde-principale',
    'green-dark': 'bg-verde-scuro',
  };

  const spacingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-section',
  };

  return (
    <section className={`${bgClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
};

// ========================================
// CONTAINER COMPONENTE
// ========================================
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// ========================================
// TITOLI COMPONENTI
// ========================================
export const H1: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h1 className={`font-serif text-h1 text-grigio-scuro ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h2 className={`font-serif text-h2 text-grigio-scuro ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h3 className={`font-serif text-h3 text-grigio-scuro ${className}`}>
    {children}
  </h3>
);

// ========================================
// BADGE COMPONENTE
// ========================================
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-verde-principale/10 text-verde-principale',
    warning: 'bg-arancione-cta/10 text-arancione-cta',
    info: 'bg-blue-100 text-blue-700',
    default: 'bg-gray-100 text-grigio-medio',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ========================================
// STEP INDICATOR COMPONENTE
// ========================================
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  labels = [],
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                ${i + 1 <= currentStep
                  ? 'bg-verde-principale text-white'
                  : 'bg-gray-200 text-grigio-medio'
                }`}
            >
              {i + 1}
            </div>
            {labels[i] && (
              <span className="mt-2 text-xs text-grigio-medio">{labels[i]}</span>
            )}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`w-16 h-1 mx-2 transition-all duration-300
                ${i + 1 < currentStep
                  ? 'bg-verde-principale'
                  : 'bg-gray-200'
                }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// ========================================
// TESTIMONIAL CARD COMPONENTE
// ========================================
interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
}

export const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  image,
}) => {
  return (
    <Card className="text-center">
      <div className="mb-4">
        <Icon name="format_quote" size="xl" className="text-verde-principale opacity-50" />
      </div>
      <p className="text-grigio-medio italic mb-6 text-body-lg leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center justify-center">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        )}
        <div className="text-left">
          <p className="font-semibold text-grigio-scuro">{author}</p>
          {role && <p className="text-sm text-grigio-medio">{role}</p>}
        </div>
      </div>
    </Card>
  );
};

// ========================================
// FEATURE CARD COMPONENTE
// ========================================
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="text-center">
      <div className="w-16 h-16 bg-verde-principale/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name={icon} size="lg" className="text-verde-principale" />
      </div>
      <H3 className="mb-4">{title}</H3>
      <p className="text-grigio-medio text-body leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

// ========================================
// STEP CARD COMPONENTE (per "Come funziona")
// ========================================
interface StepCardProps {
  number: number;
  title: string;
  description: string;
  image?: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  image,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-verde-principale text-white rounded-full flex items-center justify-center text-3xl font-serif font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <H3 className="mb-3">{title}</H3>
        <p className="text-grigio-medio text-body-lg leading-relaxed">
          {description}
        </p>
      </div>
      {image && (
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-48 h-32 object-cover rounded-card shadow-card"
          />
        </div>
      )}
    </div>
  );
};

// ========================================
// LOADING SPINNER COMPONENTE
// ========================================
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} border-4 border-verde-principale/20 border-t-verde-principale rounded-full animate-spin`} />
  );
};

// ========================================
// DIVIDER COMPONENTE
// ========================================
export const Divider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <hr className={`border-t border-gray-200 ${className}`} />
);
