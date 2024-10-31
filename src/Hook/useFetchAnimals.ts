import { useEffect, useState } from "react";
import { IAnimal } from "../Interfaces/IAnimal.ts";

const useFetchAnimals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const baseURL = "http://localhost:5050";


    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await
                    fetch(`${import.meta.env.VITE_API_URL}/animals`);

                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data: IAnimal[] = await response.json();
                setAnimals(data);

            } catch (error) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setIsLoading(false);
            }
        };


        fetchAnimals();
    }, []);

    return { animals, isLoading, error, baseURL };
};

export { useFetchAnimals };