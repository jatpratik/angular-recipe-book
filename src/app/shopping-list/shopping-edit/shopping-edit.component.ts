import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f') slForm ?: NgForm;

  subscription?:Subscription;
  editMode = false;
  editedItemIndex:number=10;
  editedItem ?: ingredients;

// @ViewChild('nameInput') nameRef?:ElementRef;
// @ViewChild('amountInput') amountRef?:ElementRef;
// @Output() ingredentDataAdded = new EventEmitter<ingredients>();
 onAddIngredent(form :NgForm){
  const value= form.value;
  // const name = this.nameRef?.nativeElement.value;
  // const amount = this.amountRef?.nativeElement.value;
  const ing = new ingredients(value.name , value.amount);
  if(this.editMode){
    this.shoppinglist.updateEditItem(this.editedItemIndex,ing)
  }
  else{
    this.shoppinglist.addShoppingList(ing);
  }
  this.editMode=false;
  form.reset();
  // this.ingredentDataAdded.emit(ing);
 }

 onClear(){
  this.slForm?.reset();
  this.editMode=false;
 }

 onDelete(){
  this.onClear();
  this.shoppinglist.onDeleteIngredient(this.editedItemIndex)
 }

 constructor(private shoppinglist:ShoppingService){

 }

  ngOnInit(){
    this.shoppinglist.addEditItem
      .subscribe(
        (index:number) =>{
          this.editMode=true;
          this.editedItemIndex=index;
          this.editedItem= this.shoppinglist.getEditItem(index);
          this.slForm?.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount

          })
        }
      )
  }



  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
