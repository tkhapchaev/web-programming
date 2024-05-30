export declare class UserDto {
    id: number;
    email: string;
    name: string;
    password?: string;
}
export declare class UserCreateDto {
    auth0Id: string;
    email: string;
    name: string;
    password?: string;
}
export declare class UserUpdateDto {
    email?: string;
    password?: string;
}
