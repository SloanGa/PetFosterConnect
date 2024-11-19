import { IDepartment } from "./IDepartment.ts";
import { IUser } from "./IUser";


interface IFamily {
    id: number;
    name: string;
    address: string;
    zip_code: string;
    department_id: number;
    department: IDepartment;
    city: string;
    slug?: string;
    phone_number: string;
    description: string | null;
    url_image: string | null;
    created_at: Date;
    updated_at: Date;
    user?: IUser;
}

export type { IFamily };
