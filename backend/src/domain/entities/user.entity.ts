import { CustomError } from '../error/custom.error';
export class UserEntity {
    constructor(
        public id: string,
        public user: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string,
        public img?: string,
    ){}

    static fromObject( option: {[key: string]: any}) {
        const { id, _id, user, email, emailValidated, password, role, img} = option;
    
        if( !id && !_id ) throw CustomError.badRequest( 'Id entity is required' );
        if( !user ) throw CustomError.badRequest( 'User entity is required' );
        if( !email ) throw CustomError.badRequest( 'Email entity is required' );
        if( !password ) throw CustomError.badRequest( 'Password entity is required' );
    
        return new UserEntity( id || _id, user, email, emailValidated, password, role, img );
    }   
}