import { combineReducers, Reducer } from 'redux'

import { FETCH_MARKET_RATE_FULFILLED, FetchMarketRateFulfilledAction } from '../actions'

export type MarketRatesState = {
  data: Array<Object>,
}

const initialState: MarketRatesState = {
  data: [],
}

const marketRates: Reducer<MarketRatesState, FetchMarketRateFulfilledAction> =
   (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_RATE_FULFILLED:
      return {
        ...state,
        data: state.data.concat(action.payload.bpi),
      }

    default:
      return state;
  }
}

// root reducer
export const rootReducer = combineReducers({
  marketRates,
})
