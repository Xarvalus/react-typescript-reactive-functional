import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { interval, Subscription } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { subDays } from 'date-fns'

// TODO: ommiting typechecks (Issue https://github.com/ramda/ramda/issues/2487)
const R = require('ramda')

import { fetchMarketRate } from '../../actions/index'
import { MarketRatesState } from '../../reducers'

import './styles.css'

interface Props {
  rates: Array<Object>,
  fetchMarketRate: Function,
}

const App = ({ rates, fetchMarketRate }: Props) => {
  const INTERVAL_RATE = 800
  const LIMIT = 30
  
  const observable = interval(INTERVAL_RATE).pipe(
    take(LIMIT),
    map(i => fetchMarketRate({ date: subDays(new Date(), i + 1) }))
  )
  
  const [buttonClicked, setButtonClicked] = useState(false)
  const [subscription, setSubscription] = useState(Subscription.EMPTY)

  useEffect(() => {
    setSubscription(observable.subscribe())

    return () => {
      subscription.unsubscribe()
    }
  }, []) // for `[]` runs only once, same as `componentDidMount`

  if (buttonClicked) {
    subscription.unsubscribe()
  }

  return (
    <div className="App">
      <h1>Reverted Bitcoin prices live data</h1>

      <p className="App-description">
        The historical rates data is cycled with interval for simulating live data source,
        operating stream-like on collection with Observable APIs.
      </p>

      <button
        className="App-button"
        onClick={() => setButtonClicked(true)}
      >
        Stop subscribing (consuming observable)
      </button>

      <div className="App-rates">
        { Object.entries(R.mergeAll(rates)).map(([key, value]: [string, any]) => (
          <span key={key}>[{ key }]: { value.toFixed(2) }</span>
        )) }
      </div>

      <span className="App-coindesk">
        (Rates are Powered by&nbsp;
          <a className="App-link" href="https://www.coindesk.com/price/bitcoin">CoinDesk</a>)
      </span>
    </div>
  )
}

export default connect(
  ({ marketRates }: { marketRates: MarketRatesState }) => ({
    rates: marketRates.data,
  }),
  { fetchMarketRate },
)(App)
