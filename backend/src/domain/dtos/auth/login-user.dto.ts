import { regularExps } from "../../../config/regular-exp";

export class LoginUserDto {
    constructor(
        public email: string,
        public password: string,
    ){}

    static create(option: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = option;
    
        if (!regularExps.email.test(email)) return ['Email dto is required', undefined];
        if (!password) return ['Password dto is required', undefined];
    
        return [undefined, new LoginUserDto(email, password)];
    }
}