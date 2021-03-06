import { AppState } from './../store/shopping-list.reducers';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store <fromShoppingList.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // NGRX - dispatches action UPDATE_INGREDIENT
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
    } else {
      // NGRX - dispatches action ADD_INGREDIENT
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // NGRX - dispatches action DELETE_INGREDIENT
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    // NGRX - dispatches action STOP_EDIT
    this.store.dispatch(new ShoppingListActions.StopEdit);
    this.subscription.unsubscribe();
  }

}
