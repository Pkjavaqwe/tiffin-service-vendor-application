import { Retailers } from "./types";

export interface UserLoginResponse {
    token: string;
    statusCode: number;
    success: boolean,
    message: string,
    _id: string,
    refreshToken: string,
}
export interface Login {
    email: string | null;
    password: string | null;
}

export interface UserByToken {
    statuscode: number;
    data: Retailers;
}
export interface RefreshTokenResponse {
    statusCode: number;
    success: boolean,
    message: string,
    _id: string,
    newAccessToken: string,
    newRefreshToken: string,
}