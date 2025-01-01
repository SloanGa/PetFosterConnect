import { useEffect, useState, useRef } from "react";
import { IAnimal } from "../Interfaces/IAnimal.ts";

const useFetchAssociationAnimals = (token: string | null) => {
    const [paginatedAnimals, setPaginatedAnimals] = useState<IAnimal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number | null>(null);

    const baseURL = import.meta.env.VITE_API_URL;
    const animalList = useRef<HTMLDivElement | null>(null);
    

    const fetchAnimals = async (page: number = 1) => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/dashboard/association/animals?page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

				if (!response.ok) {
					return setError(
						"Une erreur est survenue, veuillez rafraîchir la page.",
					);
				}
				const data = await response.json();
				setPaginatedAnimals(data.paginatedAnimals);
				setTotalCount(data.totalCount);
			} catch (error) {
				setError("Une erreur est survenue, veuillez rafraîchir la page.");
				console.error("Erreur lors de la récupération des données:", error);
			} finally {
                setIsLoading(false);
                if (animalList.current !== null) {
                animalList.current.scrollIntoView();
            }
			}
		};


    useEffect(() => {
        fetchAnimals();
    }, [token]);

    return {
        paginatedAnimals,
        setPaginatedAnimals,
        isLoading,
        setIsLoading,
        error,
        setError,
        baseURL,
        totalCount,
        fetchAnimals,
    };
};

export { useFetchAssociationAnimals };
