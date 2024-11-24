export interface UserLoginResponse {
    token: string;
    statusCode: number;
    success: boolean,
    message: string,
}
export interface Login {
    email: string | null;
    password: string | null;
}