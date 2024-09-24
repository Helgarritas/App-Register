export class DeleteAttDto {
    constructor(
        public _id: string,
    ){}

    static create( option: {[key: string]: any}): [string?, DeleteAttDto?] {
        const { _id } = option;

        if( !_id ) return ['Id dto is required', undefined];

        return [undefined, new DeleteAttDto( _id )]
    }
}   
