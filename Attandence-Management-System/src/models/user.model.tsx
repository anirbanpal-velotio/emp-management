export type USER_STATE = {
    id: number|string;
    name: string;
    email: string;
    password?:string;
    dateOfJoining: Date|string;
    age: number|string;
    role: string;
}