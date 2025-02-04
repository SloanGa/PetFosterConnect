import { useEffect, useState } from "react";
import { IAnimal } from "../Interfaces/IAnimal.ts";

const useFetchAnimals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [paginatedAnimals, setPaginatedAnimals] = useState<IAnimal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/animals`);

                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                setAnimals(data.allAnimals);
                setPaginatedAnimals(data.paginatedAnimals);
            } catch (error) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimals();
    }, []);

    return { animals, paginatedAnimals, isLoading, setIsLoading, error, setError, baseURL };
};

export { useFetchAnimals };
