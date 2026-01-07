import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AuthAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  className?: string;
}

const AuthAlert: React.FC<AuthAlertProps> = ({ type, message, className }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const styles = {
    success: "bg-success/10 text-success border-success/20",
    error: "bg-destructive/10 text-destructive border-destructive/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    info: "bg-primary/10 text-primary border-primary/20",
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg border",
      styles[type],
      className
    )}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default AuthAlert;
