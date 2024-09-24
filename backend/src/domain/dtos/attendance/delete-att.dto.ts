export class CreateAssistanceDto {
    constructor(
        public date: string,
        public arrivalTime: string,
        public departureTime: string,
        public state: string,
        public comment: string
    ){}

    static create( option: {[key: string]: any}): [string?, CreateAssistanceDto?] {
        const { date, arrivalTime, departureTime, state, comment } = option;

        if( !date ) return ['Date dto is required', undefined];
        if( !arrivalTime) return ['ArrivalTime dto is required', undefined];
        if( !departureTime ) return ['DepartureTime dto is required', undefined];
        if( !state ) return ['State dto is required', undefined];
        if( !comment ) return ['Comment dto is required', undefined];

        return [undefined, new CreateAssistanceDto( date, arrivalTime, departureTime, state, comment )]
    }
}   
