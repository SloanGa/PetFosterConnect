import "./Filters.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IDepartment } from "../../Interfaces/IDepartment.ts";
import InputWithLabel from "../InputWithLabel/InputWithLabel.tsx";

interface FiltersProps {
    animals: IAnimal[];
    handleFilter: (event: FormEvent<HTMLFormElement>) => void;
    isFiltersVisible: boolean;
    setForm: React.Dispatch<React.SetStateAction<FormData | null>>;
    setAnimalsFilterCount: React.Dispatch<React.SetStateAction<number | null>>;
}

const Filters = ({
    animals,
    handleFilter,
    isFiltersVisible,
    setForm,
    setAnimalsFilterCount,
}: FiltersProps) => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [associations, setAssociations] = useState<IAssociation[]>([]);
    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    /* Permet de retourner un tableau des type et genre sans les dupliquer */
    const uniqueSpecies = [...new Set(animals.map((animal) => animal.species))];
    const uniqueGender = [...new Set(animals.map((animal) => animal.gender))];

    /* Empêche l'utilisateur de pourvoir avoir plusieurs checkbox cochée */
    const handleAgeCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedAge(selectedAge === value ? null : value);
    };
    const handleSizeCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedSize(selectedSize === value ? null : value);
    };

    /* Reinitialise le formulaire */
    const handleResetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        const form = e.currentTarget.form;
        if (form) {
            form.reset();
            setSelectedSize(null);
            setSelectedAge(null);
            setForm(null);
            setAnimalsFilterCount(null);
        }
    };

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/departments`),
                    fetch(`${import.meta.env.VITE_API_URL}/associations`),
                ]);

                const departments = await response1.json();
                const associations = await response2.json();

                setDepartments(departments);
                setAssociations(associations);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFilterData();
    }, []);

    return (
        <div className={`filters ${isFiltersVisible ? "active" : ""}`}>
            <form
                className="filters__form"
                method="get"
                action={`${import.meta.env.VITE_API_URL}/animals/search`}
                onSubmit={handleFilter}
            >
                <label className="filters__form__description" htmlFor="species">
                    Type
                </label>
                <select className="form-select" id="species" name="species">
                    <option value="">Tous les types</option>
                    {uniqueSpecies.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>

                <label className="filters__form__description" htmlFor="department">
                    Localisation
                </label>
                <select className="form-select" id="department" name="department_id">
                    <option value="">Tous les départements</option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.name}
                        </option>
                    ))}
                </select>

                <label className="filters__form__description" htmlFor="association">
                    Association
                </label>
                <select className="form-select" id="association" name="association_id">
                    <option value="">Toutes les associations</option>
                    {associations.map((association) => (
                        <option key={association.id} value={association.id}>
                            {association.name}
                        </option>
                    ))}
                </select>

                <label className="filters__form__description" htmlFor="gender">
                    Genre
                </label>
                <select className="form-select" id="gender" name="gender">
                    <option value="">Tous les genres</option>
                    {uniqueGender.map((gender) => (
                        <option key={gender} value={gender}>
                            {gender}
                        </option>
                    ))}
                </select>

                <fieldset className="filters__form__fieldset">
                    <legend className="filters__form__description">Âge</legend>

                    <InputWithLabel id="0-2" classNameInput="form-check-input" type="checkbox" name="age" ariaLabel="0 à 2 ans"
                                    value="0-2" text="0 à 2 ans" onChange={handleAgeCheckBoxChange}
                                    selected={selectedAge!} />

                    <InputWithLabel id="2-5" classNameInput="form-check-input" type="checkbox" name="age" ariaLabel="2 à 5 ans"
                                    value="2-5" text="2 à 5 ans" onChange={handleAgeCheckBoxChange}
                                    selected={selectedAge!} />

                    <InputWithLabel id="5-10" classNameInput="form-check-input" type="checkbox" name="age" ariaLabel="5 à 10 ans"
                                    value="5-10" text="5 à 10 ans" onChange={handleAgeCheckBoxChange}
                                    selected={selectedAge!} />

                    <InputWithLabel id="11" classNameInput="form-check-input" type="checkbox" name="age"
                                    ariaLabel="Plus de 10 ans"
                                    value="11" text="< 10 ans" onChange={handleAgeCheckBoxChange}
                                    selected={selectedAge!} />

                </fieldset>

                <fieldset className="filters__form__fieldset">
                    <legend className="filters__form__description">Taille</legend>


                    <InputWithLabel id="small" classNameInput="form-check-input" type="checkbox" name="size" ariaLabel="Petit"
                                    value="Petit" text="Petit" onChange={handleSizeCheckBoxChange}
                                    selected={selectedSize!} />

                    <InputWithLabel id="medium" classNameInput="form-check-input" type="checkbox" name="size" ariaLabel="Moyen"
                                    value="Moyen" text="Moyen" onChange={handleSizeCheckBoxChange}
                                    selected={selectedSize!} />

                    <InputWithLabel id="large" classNameInput="form-check-input" type="checkbox" name="size" ariaLabel="Grand"
                                    value="Grand" text="Grand" onChange={handleSizeCheckBoxChange}
                                    selected={selectedSize!} />

                </fieldset>

                <button className="btn" type="submit" aria-label="Bouton de recherche">
                    Rechercher
                </button>

                <button
                    className="btn__form--reinit"
                    type="button"
                    aria-label="Bouton de reinitialisation du formulaire"
                    onClick={handleResetForm}
                >
                    Réinitialiser
                </button>
            </form>
        </div>
    );
};

export default Filters;
