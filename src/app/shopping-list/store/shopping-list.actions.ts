import {Action} from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

/** Steps for creating a new actions
 * 1) Create a const string with action name
 * 2) Create a class for that action with readonly type(the const string) & payload
 * 3) Add it to the ShoppingListActions using a union declaration
 * 4) Add it to the switch case of the reducer
 */

// const actions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
// classes
export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: {ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;

}


// List of the actions
export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
