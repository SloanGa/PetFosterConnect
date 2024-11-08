import { useEffect, useState } from "react";
import { IAssociation } from "../Interfaces/IAssociation.ts";

const useFetchAssociations = () => {
    const [associations, setAssociations] = useState<IAssociation[]>([]);
    const [paginatedAssociations, setPaginatedAssociations] = useState<IAssociation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const baseURL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const fetchAssociations = async () => {
            try {
                const response = await
                    fetch(`${import.meta.env.VITE_API_URL}/associations`);

                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                setAssociations(data.allAssociations);
                setPaginatedAssociations(data.paginatedAssociations);

            } catch (error) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setIsLoading(false);
            }
        };


        fetchAssociations();
    }, []);

    return { associations, paginatedAssociations, isLoading, setIsLoading, error, setError, baseURL };
};

export { useFetchAssociations };