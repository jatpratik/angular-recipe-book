import { ingredients } from "src/app/shared/ingredients.model";

export class Recipe{
    public recipe_name:string;
    public description:string;
    public image_url:string;
    public ingredients:ingredients[];

    constructor(recipe_name:string,description:string,image_url:string,ingredients:ingredients[]){
        this.recipe_name=recipe_name;
        this.description=description;
        this.image_url=image_url;
        this.ingredients=ingredients;
    }
}
