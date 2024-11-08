import { useEffect, useState } from "react";
import { IAnimal } from "../Interfaces/IAnimal.ts";

const useFetchDepartments = () => {
    const [departments, setDepartments] = useState<IAnimal[]>([]);
    


    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await
                    fetch(`${import.meta.env.VITE_API_URL}/departments`);

                if (!response.ok) {
                    return 
                }
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } 
        };


        fetchDepartments();
    }, []);

    return { departments };
};

export { useFetchDepartments };