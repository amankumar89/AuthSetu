import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthAlert from '@/components/auth/AuthAlert';
import { authApi } from '@/utils/api';
import toast from 'react-hot-toast';

const verifyEmailSchema = z.object({
  code: z.string().trim().min(4, 'Verification code is required').max(10, 'Invalid code'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { verifyEmail, isAuthenticated, user } = useAuth();
  const { verifyEmail, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await verifyEmail(data.code);
      toast.success('Email verified successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed. Please try again.';
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || errorMessage);
      toast.error("Failed to verify email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError(null);
    setSuccess(null);

    try {
      // Call resend verification endpoint if available
      await authApi.verifyEmail('resend');
      setSuccess('Verification code resent successfully!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend code.';
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if(isAuthenticated && user?.isVerified) navigate("/");
  }, [isAuthenticated, navigate, JSON.stringify(user)])


  return (
    <AuthLayout title="Verify your email" subtitle="Enter the code we sent to your email">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && <AuthAlert type="error" message={error} />}
        {success && <AuthAlert type="success" message={success} />}
        
        <AuthInput
          label="Verification code"
          type="text"
          placeholder="Enter code"
          error={errors.code?.message}
          {...register('code')}
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Verify email
        </AuthButton>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-sm text-primary hover:underline disabled:opacity-50"
          >
            {isResending ? 'Sending...' : "Didn't receive a code? Resend"}
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmail;
