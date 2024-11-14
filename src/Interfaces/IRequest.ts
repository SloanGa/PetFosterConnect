import { IAssociation } from "./IAssociation.ts";
import { IAnimal } from "./IAnimal.ts";
import { IFamily } from "./IFamily.ts";
import { IUser } from "./IUser.ts";

interface IRequest {
    id: number;
    status: string;
    animal_id: number;
    animal: IAnimal;
    association_id: number;
    association: IAssociation;
    family_id: number;
    family: IFamily;
    created_at: string;
    updated_at: string;
    user ?: IUser;
    user_id? : number;
}

export default IRequest;