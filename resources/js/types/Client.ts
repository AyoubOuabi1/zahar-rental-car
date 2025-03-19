export interface Client {
    id?: number;
    identity_or_passport_number: string;
    full_name: string;
    email: string;
    mobile_number: string;
    address: string;
    permit_license_id: string;
    created_at?: string;
    updated_at?: string;
}
