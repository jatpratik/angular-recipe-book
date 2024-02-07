import { EventEmitter, Injectable, Output } from "@angular/core";
import { Recipe } from "./recipe-list/recipe-model";
import { ingredients } from "../shared/ingredients.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{

    onChangeRecipe=new Subject<Recipe[]>();
    onDetailData=new EventEmitter<Recipe>();


    // private recipes:Recipe[]=[
    //     new Recipe("this is first","it has good test and with sweet garlic nan",
    //     "https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg",
    //     [
    //         new ingredients("meal",1),
    //         new ingredients("gulab jammun",5),
    //         new ingredients("gulab jammun",5),
    //     ]
    //     ) ,
    //     new Recipe("this is second","it has good test and with sweet garlic nan","https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg"
    //    ,
    //    [
    //     new ingredients("balu-sahii",1),
    //     new ingredients("chakkiii",5),
    //    ]
    //     ) ,
    //     new Recipe("this is third","it has good test and with sweet garlic nan","https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/08/Recipe.jpg"
    //    ,
    //    [
    //     new ingredients("balu-sahii",1),
    //     new ingredients("chakkiii",5),
    //    ]
    //     ) 
    //    ];

    private recipes:Recipe[]=[];

       constructor(private shopingList:ShoppingService){

       }

    getRecipe(){
        return this.recipes.slice();
    }

    setRecipe(recipes:Recipe[]){
        this.recipes=recipes;
        this.onChangeRecipe.next(this.recipes.slice());
    }

    addShoppingListArray(data?:ingredients[]){
        this.shopingList.addShoppingListArray(data);
    }

    getRecipeById(id:number){
        return this.recipes[id];
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.onChangeRecipe.next(this.recipes.slice())
    }

    updateRecipe(index:number,recipe:Recipe){
        this.recipes[index]=recipe;
        this.onChangeRecipe.next(this.recipes.slice())
        console.log("from service recipes",this.recipes)
    }

    onDeleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.onChangeRecipe.next(this.recipes.slice());
    }


}