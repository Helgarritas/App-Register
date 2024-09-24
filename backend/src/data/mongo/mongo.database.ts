import mongoose from "mongoose";


interface Option {
    mongoUrl: string;
    dbName: string;    
}

export class MongoDataBase {
    
    static async connect( option: Option ) {
        const { mongoUrl, dbName } = option

        try{
            await mongoose.connect(mongoUrl, { dbName })
            console.log('Mongo connect');
        }catch( error ){
            console.log( error );
        }
    }

}