import { Retailers } from "./types";

export interface UserLoginResponse {
    token: string;
    statusCode: number;
    success: boolean,
    message: string,
    _id: string,
}
export interface Login {
    email: string | null;
    password: string | null;
}

export interface UserByToken {
    statuscode: number;
    data: Retailers;
  }