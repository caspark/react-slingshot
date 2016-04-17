// @flow
import React from 'react';
import { expect } from 'chai';
import * as Actions from './fuelSavingsActions';

describe('Actions', function() {
  const appState = {
    newMpg: 20,
    tradeMpg: 10,
    newPpg: 1.50,
    tradePpg: 1.50,
    milesDriven: 100,
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

  it('should create an action to save fuel savings', function() {
    const expected = {
      type: Actions.ActionTypes.SAVE_FUEL_SAVINGS,
      settings: appState
    };

    expect(Actions.saveFuelSavings(appState)).to.deep.equal(expected); // Notice use of deep because it's a nested object
    // expect(ActionCreators.saveFuelSavings(appState)).to.equal(expected); // Fails. Not deeply equal
  });

  it('should create an action to calculate fuel savings', function() {
    const fieldName = 'newMpg';
    const value = '100';

    const expected = {
      type: Actions.ActionTypes.CALCULATE_FUEL_SAVINGS,
      settings: appState,
      fieldName: fieldName,
      value: value
    };

    expect(Actions.calculateFuelSavings(appState, fieldName, value)).to.deep.equal(expected);
  });
});
