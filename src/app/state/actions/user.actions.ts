import { createAction, props } from '@ngrx/store';

// Action to set the search ID in the state
export const setSearchId = createAction(
  '[User] Set Search ID', // Action type identifier
  props<{ searchId: number }>() // Payload: an object containing the searchId of type number
);

// Action to clear the search ID from the state
export const clearSearchId = createAction(
  '[User] Clear Search ID' // Action type identifier
);
