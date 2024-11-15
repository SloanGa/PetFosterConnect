import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate("/connexion");
		}
	}, [isAuth, navigate]);

	// Le replace assure qu'on ne peut pas faire retour en arrière (car remplace dans l'historique)
	if (!isAuth) return <Navigate to="/connexion" replace />;

	return <>{children}</>;
};

export default ProtectedRoute;
