import React, { useState, useEffect, ReactChild } from 'react'
import { Rates, Currencies, Valute } from "./types"
import axios from "axios"
import "./ExchangeRates.css"
import * as R from "ramda"
import * as uid from "uuid"

type ExchangeRatesProps = {
  valute: string
}

export const ExchangeRates: React.FC<ExchangeRatesProps> = props => {

  const [rates, setRates] = useState<Object>({})

  useEffect(() => {
    const getRates = async () => {
      await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${props.valute}.json`)
        .then(resp => {
          setRates(resp.data)
        })
        .catch(err => {
          console.log("Oh nyoo: " + err)
        })
    }
    getRates()
  }, [props.valute])

  const arrayFromObj =
    Object.entries(rates)
      .filter(([_, v]) => typeof v !== "string")
      .map(x => R.pair(R.keysIn(x[1]), R.valuesIn(x[1])))

  const tuplesFromArray = R.head(
    R.map(([x, y]) =>
      R.zip(x, y as number[]),
      arrayFromObj
    )
  ) || []
  
  return (
    <div className="ExchangeRatesContainer">
      { R.map(x =>
        <div key={uid.v4()}>{R.head(x) + " = " + R.last(x)}</div>,
        tuplesFromArray
      )}
    </div>
  )
}
