import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { Recipe } from './recipe-model';
import { RecipeService } from '../recipe.service';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  @Output() onSelectedDetailss=new EventEmitter<Recipe>();
  public recipes:Recipe[]=[];

  constructor(private recipe:RecipeService,
    private router:Router,
    private route: ActivatedRoute){
    
  }
  
  ngOnInit(): void {

    this.recipe.onChangeRecipe.subscribe(
      (recipes:Recipe[])=>{
          this.recipes=recipes;
      }
    )

   this.recipes =this.recipe.getRecipe()
    
  }
  
  onRecipeNew (){
    this.router.navigate(['new'],{relativeTo:this.route})
    console.log("the recipe",this.recipes);
  }

  onSelectedRecipe=(selected:Recipe)=>{
    this.onSelectedDetailss.emit(selected);
  }
}
