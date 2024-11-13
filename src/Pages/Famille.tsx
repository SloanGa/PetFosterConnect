import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IFamily } from "../Interfaces/IFamily.ts";
import { useAuth } from "../Context/AuthContext.tsx";
import Profil from "./Profil/Profil.tsx";

const baseURL = import.meta.env.VITE_API_URL;

const Famille = () => {
    const { slug } = useParams();

    const arraySlug = slug!.split("-");
    const familyId = arraySlug![arraySlug!.length - 1];
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [family, setFamily] = useState<IFamily | null>(null);


    useEffect(() => {
        const fetchFamily = async () => {
            try {
                const response = await fetch(`${baseURL}/family/${familyId}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("auth_token")}` },
                });
                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                setFamily(data);
            } catch (err) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFamily();
    }, [setFamily]);


    const { isAuth, userData } = useAuth();
    const isFamilyLegitimate = isAuth && userData.family_id === parseInt(familyId);


    return <Profil entity={family} baseURL={baseURL} isLoading={isLoading} error={error}
                   isLegitimate={isFamilyLegitimate} setEntity={setFamily} />;
};


export default Famille;
