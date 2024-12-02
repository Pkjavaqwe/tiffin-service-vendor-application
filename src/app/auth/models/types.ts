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
  gst_no: string;
  organization_id: string;
  org_location: string;
  approval: Approval[];
}

export interface Approval {
  approval_status: string;
  organization_id: string;
  org_loc?: string | null;
}

export interface Retailers {
  username: string;
  password: string;
  user_image: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: RoleDetails;
  _id:string
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
