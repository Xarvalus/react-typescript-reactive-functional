// constants
export const FETCH_MARKET_RATE = 'MARKET/FETCH_MARKET_RATE'
export const FETCH_MARKET_RATE_FULFILLED = 'MARKET/FETCH_MARKET_RATE_FULFILLED'

// action types
export type FetchMarketRatePayload = { date: Date }
export type FetchMarketRateAction =
  { type: typeof FETCH_MARKET_RATE, payload: FetchMarketRatePayload }

export type FetchMarketRateFulfilledPayload = { bpi: Object }
export type FetchMarketRateFulfilledAction = 
  { type: typeof FETCH_MARKET_RATE_FULFILLED, payload: FetchMarketRateFulfilledPayload }

// action creators
export const fetchMarketRate =
  (payload: FetchMarketRatePayload): FetchMarketRateAction =>
    ({ type: FETCH_MARKET_RATE, payload })

export const fetchMarketRateFulfilled =
  (payload: FetchMarketRateFulfilledPayload): FetchMarketRateFulfilledAction =>
    ({ type: FETCH_MARKET_RATE_FULFILLED, payload })
