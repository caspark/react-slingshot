// @flow
import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/actionTypes';
import type {KnownAction} from '../actions/fuelSavingsActions';
import calculator from '../businessLogic/fuelSavingsCalculator';
import dateHelper from '../businessLogic/dateHelper';
import objectAssign from 'object-assign';

export type FuelSavingsState = {
  newMpg: string | number,
  tradeMpg: string | number,
  newPpg: string | number,
  tradePpg: string | number,
  milesDriven: string | number,
  milesDrivenTimeframe: string, //FIXME should be MilesDrivenTimeframe probably
  displayResults: boolean,
  dateModified: ?string,
  necessaryDataIsProvidedToCalculateSavings: boolean,
  savings: ActualSavingsState
}

export type ActualSavingsState = {
    monthly: number,
    annual: number,
    threeYear: number,
}

const initialState: FuelSavingsState = {
  newMpg: "",
  tradeMpg: "",
  newPpg: "",
  tradePpg: "",
  milesDriven: "",
  milesDrivenTimeframe: 'week',
  displayResults: false,
  dateModified: null,
  necessaryDataIsProvidedToCalculateSavings: false,
  savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
  }
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function fuelSavingsAppState(state: FuelSavingsState = initialState, action: KnownAction) {
  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, { dateModified: dateHelper.getFormattedDateTime(new Date()) });

    case CALCULATE_FUEL_SAVINGS:
    { // limit scope with this code block, to satisfy eslint no-case-declarations rule.
      let newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      let calc = calculator();
      newState.necessaryDataIsProvidedToCalculateSavings = calc.necessaryDataIsProvidedToCalculateSavings(newState);
      newState.dateModified = dateHelper.getFormattedDateTime(new Date());

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calc.calculateSavings(newState);
      }

      return newState;
    }

    default:
      return state;
  }
}
