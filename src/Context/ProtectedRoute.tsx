import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import Loading from "../Components/Loading/Loading.tsx";

const ProtectedRoute = ({
    children,
    requiredRole,
}: {
    children: ReactNode;
    requiredRole?: "family" | "association";
}) => {
    const { isAuth, isLoading, userData } = useAuth();

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuth) {
        return <Navigate to="/connexion" replace />; // Le replace assure qu'on ne peut pas faire retour en arrière (car remplace dans l'historique)
    }

    if (requiredRole && userData?.role !== requiredRole) {
        return <Navigate to="/connexion" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
