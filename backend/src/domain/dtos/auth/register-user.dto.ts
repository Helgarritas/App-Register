import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
    constructor(
        public user: string,
        public email: string,
        public validatedEmail: boolean,
        public password: string,
        public role: string,
        public img: string,
    ){}

    static create( option: {[key: string]: any}): [string?, RegisterUserDto?] {
        const { user, email, validatedEmail, password, role, img } = option;

        if( !user ) return ['User dto is required', undefined];
        if( !regularExps.email.test( email ) ) return ['Email dto is required', undefined];
        if( !password ) return ['Password dto is required', undefined];
        // if( password.lenght < 12 ) return ['Password dto is short', undefined];

        return [undefined, new RegisterUserDto( user, email, validatedEmail, password, role, img )]
    }
}   
