import { useEffect, useState } from "react";
import { IAnimal } from "../Interfaces/IAnimal.ts";

const useFetchDepartments = () => {
    const [departments, setDepartments] = useState<IAnimal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/departments`);

                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
            }
        };

        fetchDepartments();
    }, []);

    return { departments, error };
};

export { useFetchDepartments };
