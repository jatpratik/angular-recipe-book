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
        this.http.get<Recipe[]>(' https://ng-recipe-book-51844-default-rtdb.firebaseio.com/recipe.json')
        .subscribe(
            responseData =>{
                console.log("on fetch",responseData);
                let array = [];

                // for (let index = 0; index < responseData.length; index++) {
                //     array.push( responseData[index])
                    
                // }
                for (let prop in responseData) {
                    console.log(prop + ': ' + responseData[prop]);
                    array.push(responseData[prop]);
                }

                responseData.forEach

                console.log("on fetch array",array);
                this.recipeService.setRecipe(array)
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
