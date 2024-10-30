interface IFamily {
    id: number;
    name: string;
    address: string;
    zip_code: string;
    department: string;
    city: string;
    phone_number: string;
    description: string | null;
    url_image: string | null;
    created_at: Date;
    updated_at: Date;
}

export { IFamily };