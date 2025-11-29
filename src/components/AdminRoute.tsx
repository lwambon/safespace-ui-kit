import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;
  if (user.role !== 'admin') return <div className="p-8 text-center">Forbidden: Admins only</div>;

  return <>{children}</>;
};

export default AdminRoute;
