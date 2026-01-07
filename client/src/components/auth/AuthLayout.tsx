import React, { ReactNode } from "react";
import { Shield } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              AuthSetu
            </span>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg border border-border p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
