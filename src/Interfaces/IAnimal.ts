import { IAssociation } from "./IAssociation.ts";
import { IFamily } from "./IFamily.ts";
import { IDepartment } from "./IDepartment.ts";

interface IAnimal {
    id: number;
    name: string;
    age: number;
    species: string;
    race: string | null;
    gender: string;
    size: string;
    description: string;
    availability: boolean;
    url_image: string | null;
    family_id: number | null;
    family: IFamily | null;
    association_id: number;
    association: IAssociation;
    created_at: Date;
    updated_at: Date;
}

export { IAnimal };