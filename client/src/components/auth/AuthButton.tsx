import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  className,
  disabled,
  ...props
}) => {
  const baseStyles = "w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "hover:bg-secondary text-foreground",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export default AuthButton;
