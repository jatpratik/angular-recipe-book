import { Subject, retry } from "rxjs";
import { ingredients } from "../shared/ingredients.model";
import {EventEmitter} from '@angular/core'
export class ShoppingService{

     ingredentDataAdded = new EventEmitter<ingredients[]>();
     addEditItem=new Subject<number>();

    ingredient: ingredients[]=[
        new ingredients("kajuuu",5),
        new ingredients("badam",10)
       ]

    getShoppingList(){
        return this.ingredient.slice();
    }

    getEditItem(index : number){
        return this.ingredient[index];
    }

    updateEditItem(index:number,ingredient:ingredients){
        this.ingredient[index]=ingredient;
        this.ingredentDataAdded.emit(this.ingredient.slice());
    }
    

    addShoppingList(data:ingredients){
        this.ingredient.push(data);
        this.ingredentDataAdded.emit(this.ingredient)
    }

    addShoppingListArray=(data?:ingredients[])=>{
        if(data!=undefined){
            this.ingredient.push(...data);
            this.ingredentDataAdded.emit(this.ingredient)
        }
    }

    onDeleteIngredient(index:number){
        this.ingredient.splice(index,1);
        this.ingredentDataAdded.emit(this.ingredient.slice());
    }


}