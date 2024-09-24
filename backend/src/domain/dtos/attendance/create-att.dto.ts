export class CreateAttDto {
    constructor(
        public _id: string,
        public arrivalTime: string,
        public departureTime: string,
        public status: string,
        public comment: string,
    ){}

    static create( option: {[key: string]: any}): [string?, CreateAttDto?] {
        const { _id, arrivalTime, departureTime, status, comment } = option;

        if( !_id) return ['Id dto is required', undefined];
        if( !arrivalTime) return ['ArrivalTime dto is required', undefined];
        if( !departureTime ) return ['DepartureTime dto is required', undefined];
        if( !status ) return ['Status dto is required', undefined];
        if( !comment ) return ['Comment dto is required', undefined];

        return [undefined, new CreateAttDto( _id, arrivalTime, departureTime, status, comment )]
    }
}   
