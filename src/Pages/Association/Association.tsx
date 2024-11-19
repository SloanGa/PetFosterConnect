import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { useAuth } from "../../Context/AuthContext.tsx";
import Profil from "../Profil/Profil.tsx";
import { IUser } from "../../Interfaces/IUser.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";

const baseURL = import.meta.env.VITE_API_URL;

interface AssociationProps {
    isDashboard: boolean;
}

const Association = ({ isDashboard }: AssociationProps) => {
    const { slug } = useParams();

    const arraySlug = slug!.split("-");
    const associationId = arraySlug![arraySlug!.length - 1];
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [association, setAssociation] = useState<IAssociation | IFamily | null>(null);
    const [userHasAssociation, setUserHasAssociation] = useState<IUser | null>(
        null,
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Exécute les deux requêtes en parallèle
                const [associationResponse, userResponse] = await Promise.all([
                    fetch(`${baseURL}/associations/${associationId}`),
                    fetch(
                        `${import.meta.env.VITE_API_URL}/auth/association/${associationId}`,
                    ),
                ]);

                if (!associationResponse.ok || !userResponse.ok) {
                    setError("Une erreur est survenue, veuillez rafraîchir la page.");
                    setIsLoading(false);
                    return;
                }

                const [associationData, userData] = await Promise.all([
                    associationResponse.json(),
                    userResponse.json(),
                ]);

                setAssociation(associationData);
                setUserHasAssociation(userData);
            } catch (err) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [associationId, setAssociation]);

    const { isAuth, userData } = useAuth();
    const isAssociationLegitimate =
        isAuth && userData?.association_id === parseInt(associationId);

    return (
        <>
            <Profil
                entity={association}
                baseURL={baseURL}
                isLoading={isLoading}
                error={error}
                isLegitimate={isAssociationLegitimate}
                setEntity={setAssociation}
                userHasEntity={userHasAssociation}
                isDashboard={isDashboard}
            />
        </>
    );
};

export default Association;
