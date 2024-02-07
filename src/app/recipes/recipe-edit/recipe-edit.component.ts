import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params, Router} from '@angular/router'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe-list/recipe-model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ingredients } from 'src/app/shared/ingredients.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number| any=null;
  editMode=false;
  recipeForm!: FormGroup;

  constructor(private route:ActivatedRoute,
              private recipeList:RecipeService,
              private routes:Router){

  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params) =>{
        this.id=+params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit(){
    console.log('hello submit',this.recipeForm);
    if(this.editMode){
      this.recipeList.updateRecipe(this.id,this.recipeForm.value)
    }
    else{
      this.recipeList.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
          'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]) 
          })
    )
  }

  onCancel(){
    this.routes.navigate(['../'],{relativeTo: this.route})
  }

  onDeleteIng(index:number){
     (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  initForm(){
    let rName = '';
    let rImage = '';
    let rDesc = '';
    let ingredientsArray = new FormArray<FormGroup>([])

    if(this.editMode){
     const recipeData= this.recipeList.getRecipeById(this.id);

     console.log(recipeData)
      rName=recipeData.name;
      rImage=recipeData.imageUrl;
      rDesc=recipeData.desc;
      if(recipeData['ingredients']){
        for(let ing of recipeData.ingredients){
          const formGroup =  new FormGroup({
            'name': new FormControl(ing.name,Validators.required),
            'amount': new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)])
          })
          ingredientsArray.push(formGroup);
          
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(rName,Validators.required),
      'imageUrl': new FormControl(rImage,Validators.required),
      'desc': new FormControl(rDesc,Validators.required),
      'ingredients':ingredientsArray
    })

    console.log('the controls',this.controls);    
  }
}
