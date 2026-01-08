import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthButton from '@/components/auth/AuthButton';
import AuthAlert from '@/components/auth/AuthAlert';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DeleteAccountContent: React.FC = () => {
  const navigate = useNavigate();
  const { deleteAccount, user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteAccount();
      toast.success("Account Deleted.");
      navigate('/login');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete account.';
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || errorMessage);
      toast.success("Failed to delete account.")
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AuthLayout title="Delete Account" subtitle="This action cannot be undone">
      <div className="space-y-6">
        {error && <AuthAlert type="error" message={error} />}
        
        <div className="flex items-start gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive">Warning</h3>
            <p className="text-sm text-destructive/80 mt-1">
              You are about to permanently delete your account{' '}
              <span className="font-medium">{user?.email}</span>. 
              All your data will be permanently removed and cannot be recovered.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <AuthButton
            variant="destructive"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Yes, delete my account
          </AuthButton>
          
          <Link to="/">
            <AuthButton variant="secondary" disabled={isDeleting}>
              Cancel
            </AuthButton>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

const DeleteAccount: React.FC = () => {
  return (
    <ProtectedRoute>
      <DeleteAccountContent />
    </ProtectedRoute>
  );
};

export default DeleteAccount;
