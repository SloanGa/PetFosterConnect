import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { IUser } from "../Interfaces/IUser.ts";

interface AuthContextType {
    isAuth: boolean;
    userData: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState<IUser | null>(null);


    // Récupérer les données du localStorage au montage du composant
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("auth_token");
        const tokenExpiry = localStorage.getItem("auth_token_expiry");

        // Vérifier si le token est expiré
        if (token && tokenExpiry) {
            const currentTime = Date.now();
            if (currentTime > parseInt(tokenExpiry)) {
                // Si le token est expiré, on le supprime du localStorage et on déconnecte l'utilisateur
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_token_expiry");
                localStorage.removeItem("user");
                setIsAuth(false);
                setUserData(null);
                return;
            }
        }

        // Si le token est présent, l'utilisateur est authentifié
        setIsAuth(!!token);

        // Si un utilisateur est stocké dans le localStorage, on le charge
        if (storedUser) {
            const user: IUser = JSON.parse(storedUser);
            setUserData(user);
        }
    }, []);

    const login = (user: IUser) => {
        setIsAuth(true);
        setUserData(user);
    };

    const logout = () => {
        setIsAuth(false);
        setUserData(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
    };

    console.log(userData);

    return (
        <AuthContext.Provider value={{ isAuth, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);