// @flow

import * as types from '../constants/actionTypes';

export type KnownAction = SaveFuelSavingsAction | CalculateFuelSavingsAction;

export type SettingsForAction = {
  //TODO fill in
}

export type SaveFuelSavingsAction = {
  type: 'SAVE_FUEL_SAVINGS';
  settings: SettingsForAction;
}

export function saveFuelSavings(settings: SettingsForAction): SaveFuelSavingsAction {
  return { type: types.SAVE_FUEL_SAVINGS, settings };
}

export type CalculateFuelSavingsAction = {
  type: 'CALCULATE_FUEL_SAVINGS';
  settings: SettingsForAction;
  fieldName: string;
  value: string;
}

export function calculateFuelSavings(settings: SettingsForAction, fieldName: string, value: string): CalculateFuelSavingsAction {
  return { type: types.CALCULATE_FUEL_SAVINGS, settings, fieldName, value };
}
