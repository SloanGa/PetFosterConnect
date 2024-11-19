import "./Filters.scss";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { IAnimal } from "../../Interfaces/IAnimal.ts";
import InputWithLabel from "../InputWithLabel/InputWithLabel.tsx";
import { useFetchAssociations } from "../../Hook/useFetchAssociations.ts";
import { useFetchDepartments } from "../../Hook/useFetchDepartments.ts";
import { useNavigate } from "react-router-dom";

interface FiltersProps {
	animals: IAnimal[];
	handleFilter: (event: FormEvent<HTMLFormElement>) => void;
	isFiltersVisible: boolean;
	setForm: React.Dispatch<React.SetStateAction<FormData | null>>;
	setAnimalsFilterCount: React.Dispatch<React.SetStateAction<number | null>>;
	setIsFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters = ({
	animals,
	handleFilter,
	isFiltersVisible,
	setForm,
	setAnimalsFilterCount,
	setIsFiltersVisible,
}: FiltersProps) => {

    const [selectedAge, setSelectedAge] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const { associations } = useFetchAssociations();
    const { departments } = useFetchDepartments();

    const navigate = useNavigate();

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
            setIsFiltersVisible((prev) => !prev); //fermer les filtres sur mobile
            navigate("/animaux");
        }
    };

    return (
        <div className={`filters ${isFiltersVisible ? "active" : ""}`}>
            <form
                className="filters__form"
                method="get"
                action={`${import.meta.env.VITE_API_URL}/animals/search`}
                onSubmit={handleFilter}
            >
                <label className="filters__form__description" htmlFor="availability">
                    Disponibilité
                </label>
                <select className="form-select" id="availability" name="availability">
                    <option value="">Toutes les disponibilités</option>
                    <option value="true">Disponible</option>
                    <option value="false">Indisponible</option>
                </select>

                <label className="filters__form__description" htmlFor="species">
                    Espèce
                </label>
                <select className="form-select" id="species" name="species">
                    <option value="">Tous les espèces</option>
                    {uniqueSpecies.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>

                <label className="filters__form__description" htmlFor="department">
                    Département
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

                    <InputWithLabel
                        id="0-2"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="age"
                        ariaLabel="0 à 2 ans"
                        value="0-2"
                        text="0 à 2 ans"
                        onChange={handleAgeCheckBoxChange}
                        selected={selectedAge!}
                    />

                    <InputWithLabel
                        id="2-5"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="age"
                        ariaLabel="2 à 5 ans"
                        value="2-5"
                        text="2 à 5 ans"
                        onChange={handleAgeCheckBoxChange}
                        selected={selectedAge!}
                    />

                    <InputWithLabel
                        id="5-10"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="age"
                        ariaLabel="5 à 10 ans"
                        value="5-10"
                        text="5 à 10 ans"
                        onChange={handleAgeCheckBoxChange}
                        selected={selectedAge!}
                    />

                    <InputWithLabel
                        id="11"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="age"
                        ariaLabel="Plus de 10 ans"
                        value="11"
                        text="< 10 ans"
                        onChange={handleAgeCheckBoxChange}
                        selected={selectedAge!}
                    />
                </fieldset>

                <fieldset className="filters__form__fieldset">
                    <legend className="filters__form__description">Taille</legend>

                    <InputWithLabel
                        id="small"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="size"
                        ariaLabel="Petit"
                        value="Petit"
                        text="Petit"
                        onChange={handleSizeCheckBoxChange}
                        selected={selectedSize!}
                    />

                    <InputWithLabel
                        id="medium"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="size"
                        ariaLabel="Moyen"
                        value="Moyen"
                        text="Moyen"
                        onChange={handleSizeCheckBoxChange}
                        selected={selectedSize!}
                    />

                    <InputWithLabel
                        id="large"
                        classNameInput="form-check-input"
                        type="checkbox"
                        name="size"
                        ariaLabel="Grand"
                        value="Grand"
                        text="Grand"
                        onChange={handleSizeCheckBoxChange}
                        selected={selectedSize!}
                    />
                </fieldset>

                <button className="btn" type="submit" aria-label="Lancer la recherche">
                    Rechercher
                </button>

                <button
                    className="btn btn--form-reinit"
                    type="button"
                    aria-label="Réinitialiser la recherche"
                    onClick={handleResetForm}
                >
                    Réinitialiser
                </button>
            </form>
        </div>
    );
};

export default Filters;
