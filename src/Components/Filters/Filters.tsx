import "./Filters.scss";
import { useEffect, useState } from "react";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IDepartment } from "../../Interfaces/IDepartment.ts";

interface FiltersProps {
    animals: IAnimal[];
}

const Filters = ({ animals }: FiltersProps) => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [associations, setAssociations] = useState<IAssociation[]>([]);

    const uniqueSpecies = [...new Set(animals.map((animal) => animal.species))];
    const uniqueGender = [...new Set(animals.map((animal) => animal.gender))];

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
        <div className="filters">
            <form className="filters__form" method="post" action="">
                <label className="filters__form__description" htmlFor="species">Type</label>
                <select className="form-select" id="species" name="species">
                    <option value="">Tous les types</option>
                    {uniqueSpecies.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}

                </select>

                <label className="filters__form__description" htmlFor="department">Localisation</label>
                <select className="form-select" id="department" name="department">
                    <option value="">Tous les départements</option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.name}>{department.name}</option>
                    ))}
                </select>

                <label className="filters__form__description" htmlFor="association">Association</label>
                <select className="form-select" id="association" name="association">
                    <option value="">Toutes les associations</option>
                    {associations.map((association) => (
                        <option key={association.id} value={association.name}>{association.name}</option>
                    ))}
                </select>

                <label className="filters__form__description" htmlFor="gender">Genre</label>
                <select className="form-select" id="gender" name="gender">
                    <option value="">Tous les genres</option>
                    {uniqueGender.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>

                <fieldset className="filters__form__fieldset">
                    <legend className="filters__form__description">Âge</legend>
                    <label>
                        <input className="form-check-input" type="checkbox" name="age" value="0-2"
                               aria-label="0 à 2 ans" />
                        0 à 2 ans
                    </label>
                    <label>
                        <input className="form-check-input" type="checkbox" name="age" value="2-5"
                               aria-label="2 à 5 ans" />
                        2 à 5 ans
                    </label>
                    <label>
                        <input className="form-check-input" type="checkbox" name="age" value="5-10"
                               aria-label="5 à 10 ans" />
                        5 à 10 ans
                    </label>
                    <label>
                        <input className="form-check-input" type="checkbox" name="age" value="11"
                               aria-label="Plus de 10 ans" />
                        10 ans
                    </label>
                </fieldset>

                <fieldset className="filters__form__fieldset">
                    <legend className="filters__form__description">Taille</legend>
                    <label>
                        <input className="form-check-input" type="checkbox" name="size" value="small"
                               aria-label="Petit" />
                        Petit
                    </label>
                    <label>
                        <input className="form-check-input" type="checkbox" name="size" value="medium"
                               aria-label="Moyen" />
                        Moyen
                    </label>
                    <label>
                        <input className="form-check-input" type="checkbox" name="size" value="large"
                               aria-label="Grand" />
                        Grand
                    </label>
                </fieldset>

                <button className="btn" type="submit" aria-label="Bouton de recherche">
                    Rechercher
                </button>
            </form>
        </div>

    );
};

export default Filters;
