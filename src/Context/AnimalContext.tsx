/* Ne pas supprimer. Context que l'on pourra réutiliser pour l'auth */


// import { createContext, useContext, useEffect, useState } from "react";
// import { IAnimal } from "../Interfaces/IAnimal.ts";
//
// interface AnimalsContextType {
//     animals: IAnimal[];
//     isLoading: boolean;
//     error: string | null;
// }
//
// const AnimalContext = createContext<AnimalsContextType>({ animals: [], error: null, isLoading: true });
//
// const AnimalProvider = ({ children }) => {
//     const [animals, setAnimals] = useState<IAnimal[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         const fetchAnimals = async () => {
//             try {
//                 const response = await
//                     fetch(`${import.meta.env.VITE_API_URL}/animals`);
//
//                 if (!response.ok) {
//                     return setError("Une erreur est survenue, veuillez rafraîchir la page.");
//                 }
//                 const animals = await response.json();
//                 setAnimals(animals);
//
//             } catch (error) {
//                 setError("Une erreur est survenue, veuillez rafraîchir la page.");
//                 console.error("Erreur lors de la récupération des données:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//
//         fetchAnimals();
//     }, []);
//
//     return (
//         <AnimalContext.Provider
//             value={{ animals, isLoading, error }}
//         >
//             {children}
//         </AnimalContext.Provider>
//     );
// };
//
// const useAnimals = () => useContext(AnimalContext);
//
// export { AnimalProvider, useAnimals };