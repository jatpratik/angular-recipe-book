import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-list/recipe-model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  
  details:Recipe | undefined;

    constructor(private recipeService: RecipeService){

    }

    ngOnInit() {
      this.recipeService.onDetailData.subscribe((recipe : Recipe) => {
        this.details=recipe;
      })
      
    }
    
    
}
