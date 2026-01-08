import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthButton from "@/components/auth/AuthButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { User, Mail, LogOut, Trash2, Shield } from "lucide-react";
import toast from "react-hot-toast";

const ProfileContent: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logout Successful.");
      navigate("/login");
    } catch {
      toast.error("Failed to Logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/50">
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AuthSetu</span>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-card rounded-xl shadow-lg border border-border p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user?.name}
              </h1>
              <p className="text-muted-foreground">Welcome back!</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-foreground font-medium">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Account Actions
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <AuthButton
                  variant="secondary"
                  onClick={handleLogout}
                  isLoading={isLoggingOut}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </AuthButton>
                <Link to="/delete-account" className="w-full sm:w-auto">
                  <AuthButton variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4" />
                    Delete account
                  </AuthButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
};

export default Profile;
