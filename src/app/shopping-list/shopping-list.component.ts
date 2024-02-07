import { Component, OnInit } from '@angular/core';
import { ingredients } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

   ingredients: ingredients[]=[];
  
   // onIngredentAdd(data:ingredients){
   //    this.ingredients.push(data);
   // }

   constructor(private shoppingList:ShoppingService){

   }

   ngOnInit() {
      this.ingredients=this.shoppingList.getShoppingList();

      this.shoppingList.ingredentDataAdded.subscribe((ingre:ingredients[]) =>{
         this.ingredients=ingre;
      })
   }

   onEditItem(index:number){
      this.shoppingList.addEditItem.next(index);
   }
}
