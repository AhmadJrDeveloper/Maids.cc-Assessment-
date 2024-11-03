import { createReducer, on } from '@ngrx/store';
import { setSearchId, clearSearchId } from '../actions/user.actions';

// Interface to define the shape of the user state
export interface UserState {
  searchId: number; // Variable to hold the search ID
}

// Initial state of the user
export const initialState: UserState = {
  searchId: 0, // Default value for search ID
};

// Creating the user reducer
export const userReducer = createReducer(
  initialState, // Setting the initial state
  // Handling the setSearchId action
  on(setSearchId, (state, { searchId }) => ({
    ...state,
    searchId,
  })),
  // Handling the clearSearchId action
  on(clearSearchId, (state) => ({
    ...state,
    searchId: 0,
  }))
);
