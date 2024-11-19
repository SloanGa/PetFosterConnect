import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import Loading from "../Components/Loading/Loading.tsx";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuth) {
        return <Navigate to="/connexion" replace />; // Le replace assure qu'on ne peut pas faire retour en arrière (car remplace dans l'historique)
    }

    return <>{children}</>;
};

export default ProtectedRoute;
