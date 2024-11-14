import { useEffect, useState } from "react";
import { IAnimal } from "../Interfaces/IAnimal.ts";

const useFetchAssociationAnimals = (token: string | null) => {
	const [paginatedAnimals, setPaginatedAnimals] = useState<IAnimal[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalCount, setTotalCount] = useState<number | null>(null);

	const baseURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchAnimals = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/dashboard/association/animals`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				if (!response.ok) {
					return setError(
						"Une erreur est survenue, veuillez rafraîchir la page.",
					);
				}
				const data = await response.json();
				console.log(data);
				setPaginatedAnimals(data.paginatedAnimals);
				setTotalCount(data.totalCount);
			} catch (error) {
				setError("Une erreur est survenue, veuillez rafraîchir la page.");
				console.error("Erreur lors de la récupération des données:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnimals();
	}, [token]);

	return {
		paginatedAnimals,
		isLoading,
		setIsLoading,
		error,
		setError,
		baseURL,
		totalCount,
	};
};

export { useFetchAssociationAnimals };
