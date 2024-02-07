import { ingredients } from "src/app/shared/ingredients.model";

export class Recipe{
    public name:string;
    public desc:string;
    public imageUrl:string;
    public ingredients:ingredients[];

    constructor(name:string,desc:string,imageUrl:string,ingredients:ingredients[]){
        this.name=name;
        this.desc=desc;
        this.imageUrl=imageUrl;
        this.ingredients=ingredients;
    }
}