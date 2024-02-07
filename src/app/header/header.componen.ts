import { Component, EventEmitter, Output } from "@angular/core";
import { storeRecipe } from "../shared/store-recipe.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent{

    // @Output() featureSelected=new EventEmitter<string>();

    // onSelect(feature : string ){
    //     this.featureSelected.emit(feature);
    // }
    constructor(private recipeStore:storeRecipe){}

    onSave(){
        this.recipeStore.onStore();
    }

    onFatch(){
        this.recipeStore.onFatch();
    }
}