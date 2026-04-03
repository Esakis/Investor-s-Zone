import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ email, children }: { email: string; children: ReactNode }) => {
    if (!email) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

export default ProtectedRoute;
