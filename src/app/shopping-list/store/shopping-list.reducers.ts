/* make sure to add this to app.module.ts */
import {
  Ingredient
} from './../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


/* Initial State */
const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

/*
 Reducer function will be triggered when an action is dispatched.
 We will get the current state (which is given by ngrx) and a type  

 and we have to return the new state of our application, behind the scene, ngrx will return the updated state
*/
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    /*
    Adds a new ingredient by returning the updated state and the updated version of the ingredients
    */
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
      /*
         Add new ingredients by returning the updated state and the updated version of the ingredients
      */
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
      /*
         Updates a current ingredient by returning the updated state and the updated version of the ingredients
      */
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex]; // takes the current ingredient that needs to be changed
      const updatedIngredient = { // take the updated ingredient
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients]; // take the current ingredients array in the state
      ingredients[state.editedIngredientIndex] = updatedIngredient; // update the ingredient that needs to be updated
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
      /*
        Deletes an ingredient by returning the updated state and the updated version of the ingredients
      */
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients]; // take the current ingredients array in the state
      oldIngredients.splice(state.editedIngredientIndex, 1); // deletes the ingredient using the number
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    /*
      Initializes the start edit state
    */
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return{
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      }
    /*
      Stops the edit state
    */
    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}
