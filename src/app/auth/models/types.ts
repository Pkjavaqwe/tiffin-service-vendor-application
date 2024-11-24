export interface Organization {
    _id: string;
    org_name: string;
    org_image_url: string;
    org_location: Location[];
    org_created_at: Date;
    org_updated_at: Date;
    isActive: boolean;
}

export interface RoleDetails {
    gst_no: string
}

export interface Retailers {
    username: string;
    password: string;
    email: string;
    contact_number: string;
    address: string;
    role_id: string;
    role_specific_details: RoleDetails;
}

export interface Location {
    loc: string;
    address: string;
    loc_contact: number;
    loc_email: string;
    admin_id: string;
}

export interface RetailerRegister {
    data: Retailers[];
    message: string;
    statuscode: number;
    _id: string;
    token: string;
}
