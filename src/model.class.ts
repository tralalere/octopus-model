/**
 * Created by Christophe on 17/10/2017.
 */

export class Model {

    version:number;
    attributes:{[key:string]:any} = {};

    toJSON():string {
        return JSON.stringify(this.attributes);
    }
}