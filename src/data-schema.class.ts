/**
 * Created by reunion on 23/10/2017.
 */
export abstract class DataSchema {

    validateModel(object:{[key:string]:any}):boolean {
        console.log("validateModel must be implemented  in DataSchema sub-class");
        return false
    };

    generateModel():any {
        console.log("generateModel must be implemented in DataSchema sub-class");
        return null;
    };
}