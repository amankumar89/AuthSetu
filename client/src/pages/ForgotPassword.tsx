import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthAlert from '@/components/auth/AuthAlert';

const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  clientUrl: z.string().trim().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      clientUrl: window.location.origin + '/reset-password',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const clientUrl = data.clientUrl || window.location.origin + '/reset-password';
      await forgotPassword(data.email, clientUrl);
      setSuccess('Password reset instructions have been sent to your email.');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email.';
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || errorMessage);
      toast.error(errorMessage || axiosError.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot password" subtitle="We'll send you reset instructions">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && <AuthAlert type="error" message={error} />}
        {success && <AuthAlert type="success" message={success} />}
        
        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <AuthInput
          label="Redirect URL (optional)"
          type="url"
          placeholder={window.location.origin + '/reset-password'}
          error={errors.clientUrl?.message}
          {...register('clientUrl')}
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Send reset link
        </AuthButton>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
