import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { useAuth } from "../../Context/AuthContext.tsx";
import Profil from "../Profil/Profil.tsx";

const baseURL = import.meta.env.VITE_API_URL;

const Association = () => {
    const { slug } = useParams();

    const arraySlug = slug!.split("-");
    const associationId = arraySlug![arraySlug!.length - 1];
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [association, setAssociation] = useState<IAssociation | null>(null);


    useEffect(() => {
        const fetchAssociation = async () => {
            try {
                const response = await fetch(`${baseURL}/associations/${associationId}`);
                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                setAssociation(data);
            } catch (err) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAssociation();
    }, [setAssociation]);


    const { isAuth, userData } = useAuth();
    const isAssociationLegitimate = isAuth && userData?.association_id === parseInt(associationId);


    return <Profil entity={association} baseURL={baseURL} isLoading={isLoading} error={error}
                   isLegitimate={isAssociationLegitimate} setEntity={setAssociation} />;
};


export default Association;
