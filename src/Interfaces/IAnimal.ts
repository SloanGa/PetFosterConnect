import { IAssociation } from "./IAssociation.ts";
import { IFamily } from "./IFamily.ts";
import IRequest from "./IRequest.ts";

interface IAnimal {
	id: number;
	name: string;
	age: number;
	species: string;
	race: string | null;
	gender: string;
	size: string;
	description: string;
	slug?: string;
	availability: boolean;
	url_image: string | null;
	family_id: number | null;
	family: IFamily | null;
	association_id: number;
	association: IAssociation;
	requests?: IRequest[];
	created_at: Date;
	updated_at: Date;
	error?: string;
}

export type { IAnimal };
