// @flow
import { createStore } from 'redux';
import type FuelSavingsState from '../reducers/fuelSavings';
import rootReducer from '../reducers';

export default function configureStore(initialState: FuelSavingsState) {
  return createStore(rootReducer, initialState);
}
