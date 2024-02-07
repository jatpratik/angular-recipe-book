import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-list/recipe-model';
// import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute,Params,Router} from '@angular/router'

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
   detailRecipe : Recipe | undefined;
   id!:number;

  constructor(private shopingList : RecipeService,
     private route: ActivatedRoute,
     private router:Router ){

  }

  onAddIng(){
      this.shopingList.addShoppingListArray(this.detailRecipe?.ingredients);
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.detailRecipe=this.shopingList.getRecipeById(this.id);
      }
    )
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate( ['../',this.id, 'edit'],{relativeTo:this.route})
  }

  onDelete(){
    this.shopingList.onDeleteRecipe(this.id);
    this.router.navigate(['/recipe'])
  }
}
