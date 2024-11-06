import { IFamily } from "./IFamily.ts";
import { IAssociation } from "./IAssociation.ts";

interface IUser {
    id: number;
    email: string;
    family: IFamily | null;
    family_id: number | null;
    role: "family" | "association";
    association: IAssociation | null;
    association_id: number | null;
    created_at: Date;
    updated_at: Date;
}

export { IUser };