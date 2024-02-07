import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe-model";
import { map } from "rxjs";

@Injectable({providedIn:"root"})
export class storeRecipe{
    constructor(private http:HttpClient , private recipeService:RecipeService){}

    onStore(){
        const recipe=this.recipeService.getRecipe();
        this.http.put('https://ng-recipe-book-51844-default-rtdb.firebaseio.com/recipe.json',recipe).subscribe(
            ResponseData => {
                console.log("store response",ResponseData);
            }
        )
    }

    onFatch(){
        this.http.get<Recipe[]>('https://ng-recipe-book-51844-default-rtdb.firebaseio.com/recipe.json')
        .subscribe(
            responseData =>{
                this.recipeService.setRecipe(responseData)
                console.log("on fetch",responseData);
            }
        )
    }

//     .pipe(map(recipe =>{
//         return{
//             ...recipe,
//             ingredients : recipe.ingr ? recipe.ingredients : []
//         }
// }))
}