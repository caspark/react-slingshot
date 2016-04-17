// @flow
import { createStore, compose } from 'redux';
import type FuelSavingsState from '../reducers/fuelSavings';
import rootReducer from '../reducers';

/*
 * Wrap's redux's createStore to hook in the redux developer tools.
 *
 * Really, in production, the body of this function should just be "return createStore(rootReducer, initialState);",
 * however we don't have a nice way of swapping between development and production modes (or at least, we can't do
 * it using runtime imports of modules, because it seems like Flow doesn't like that) so instead we just keep the
 * dev-mode code around in production as well.
 */
export default function configureStore(initialState: any) {

  let store = createStore(rootReducer, initialState, compose(
    // Add other middleware on this line...
    window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
