import React, { useState, useEffect } from 'react'
import { Currencies } from "./types"
import * as R from "ramda"
import axios from 'axios'

export const Converter: React.FC<Currencies> = currencies => {

  const [inputVal, setInputVal] = useState<string>("")

  const [shouldRenderRates, setShouldRenderRates] = useState<boolean>(false)

  const [rate, setRate] = useState<Object>({})

  const keys = R.keysIn(currencies)

  const s = inputVal.split(" ")

  useEffect(() => {
    if (shouldRenderRates) {
      const getRates = async () => {
        await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${s[1]}/${s[3]}.json`)
          .then(resp => {
            setRate(resp.data)
          })
          .catch(err => {
            console.log("Oh nyoo: " + err)
          })
      }
      getRates()
    }
  }, [shouldRenderRates])

  const parse = () => {

    setShouldRenderRates(false)

    if (typeof parseInt(s[0]) === "number") {
      if (R.any(x => x === s[1], keys)) {
        if (s[2] === "in") {
          if (R.any(x => x === s[3], keys)) {
            setShouldRenderRates(true)
          }
        }
      }
    }
  }

  useEffect(() => {
    parse()
  }, [inputVal])

  return (
    <div>
      <input type="text" value={inputVal} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputVal(e.target.value)
        }}
      />
      { shouldRenderRates
        ? <div>
          { s[0] + " " +
            s[1] + " " +
            s[2] + " " +
            s[3] + " " + 
            "is: " + parseInt(s[0]) * R.last(R.last(Object.entries(rate)) || [])
          }
          </div>
        : <></>
      }
    </div>
  )
}
