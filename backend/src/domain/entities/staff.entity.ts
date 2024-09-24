import { CustomError } from '../error/custom.error';

export class StaffEntity {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public departament: boolean,
        public img: string,
        public cellphone: string,
        public status: string,
    ){}

    static fromObject( option: {[key: string]: any}) {
        const { _id, name, email, departament, img, cellphone, status } = option;

        if( !_id ) throw CustomError.badRequest( 'Id entity is required' );
        if( !name ) throw CustomError.badRequest( 'Name entity is required' );
        if( !email ) throw CustomError.badRequest( 'Email entity is required' );
        if( !departament ) throw CustomError.badRequest( 'Departament entity is required' );
        if( !cellphone ) throw CustomError.badRequest( 'Cellphone entity is required' );

        return new StaffEntity( _id, name, email, departament, img, cellphone, status );
    }   
}