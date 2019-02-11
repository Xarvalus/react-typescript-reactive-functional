import { combineEpics, ofType, ActionsObservable, Epic } from 'redux-observable'
import { format } from 'date-fns'

import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

import { FETCH_MARKET_RATE, FetchMarketRateAction, fetchMarketRateFulfilled } from '../actions'

// epic
const fetchMarketRateEpic: Epic = (action$: ActionsObservable<FetchMarketRateAction>) => 
  action$
  .pipe(
    ofType(FETCH_MARKET_RATE),
    mergeMap((action) => {
      const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/historical/close.json'

      const date = format(action.payload.date, 'YYYY-MM-DD')

      return ajax
        .getJSON(`${API_ENDPOINT}?start=${date}&end=${date}`)
        .pipe(
          map((response: any) => fetchMarketRateFulfilled(response)))
    })
  )

// root epic
export const rootEpic = combineEpics(
  fetchMarketRateEpic,
)
