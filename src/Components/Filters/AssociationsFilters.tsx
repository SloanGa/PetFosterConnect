import type { FormEvent } from "react";
import { useFetchDepartments } from "../../Hook/useFetchDepartments.ts";
import { useFetchAnimals } from "../../Hook/useFetchAnimals.ts";
import type { IAssociation } from "../../Interfaces/IAssociation.ts";

interface AssociationsFiltersProps {
	isFiltersVisible: boolean;
	handleFilter: (event: FormEvent<HTMLFormElement>) => void;
	associations: IAssociation[];
	setForm: React.Dispatch<React.SetStateAction<FormData | null>>;
	setIsFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssociationsFilters = ({
	isFiltersVisible,
	handleFilter,
	associations,
	setForm,
	setIsFiltersVisible,
}: AssociationsFiltersProps) => {
	const { departments } = useFetchDepartments();
	const { animals } = useFetchAnimals();

	const uniqueSpecies = [...new Set(animals.map((animal) => animal.species))];

	/* Reinitialise le formulaire */
	const handleResetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
		const form = e.currentTarget.form;
		if (form) {
			form.reset();
			setForm(null);
			setIsFiltersVisible((prev) => !prev); //fermer les filtres sur mobile
		}
	};

	return (
		<div className={`filters ${isFiltersVisible ? "active" : ""}`}>
			<form className="filters__form" onSubmit={handleFilter}>
				<label className="filters__form__description" htmlFor="name">
					Nom d'association
				</label>
				<select className="form-select" id="name" name="association_id">
					<option value="">Tous les noms</option>
					{associations.map((association) => (
						<option key={association.name} value={association.id}>
							{association.name}
						</option>
					))}
				</select>

				<label className="filters__form__description" htmlFor="department">
					Localisation association
				</label>
				<select className="form-select" id="department" name="department_id">
					<option value="">Tous les départements</option>
					{departments.map((department) => (
						<option key={department.id} value={department.id}>
							{department.name}
						</option>
					))}
				</select>

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

				<button className="btn" type="submit" aria-label="Bouton de recherche">
					Rechercher
				</button>

				<button
					className=" btn btn--form-reinit"
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

export default AssociationsFilters;
