import { useState, useEffect } from 'react'
import './App.scss'
import axios from "axios"
import * as R from "ramda"
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import { ExchangeRates } from './ExchangeRates'
import { Converter } from './Converter'
import { Currencies } from "./types"

const Header: React.FC = () => {
  const routes = [{name: "Converter", route: "/"}, {name: "Exchange Rates", route: "/rates"}]

  return (
    <div className="Header">
      { routes.map(x =>
        <Link to={x.route} key={x.name} className="HeaderItem">
          {x.name}
        </Link>
      )}
    </div>
  )
}

type SelectBasicValuteProps = {
  currencies: Currencies
  valute: string
  setValute: (valute: string) => void
}

const SelectBasicValute: React.FC<SelectBasicValuteProps> = props => {

  return (
    <div className="BasicValuteContainer">
      { Object.entries(props.currencies).map((k, v) => 
        <div key={v} className="BasicValuteItem"
          onClick={() => { 
            props.setValute(R.head(k) || "usd")
          }}
        >
          {R.last(k) + " | " + R.head(k)}
        </div>
      )}
    </div>
  )
}

const App: React.FC = () => {

  const [currencies, setCurrencies] = useState<Currencies>({mock: "mock"} as Currencies)

  const [valute, setValute] = useState<string>("usd")

  useEffect(() => {
    const getCurrencies = async () => {
      await axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
        .then(resp => {
          setCurrencies(resp.data)
        })
        .catch(err => {
          console.log("Oh nyoo: " + err)
        })
    }
    getCurrencies()
  }, [])

  return (
    <div className="Main">
      <BrowserRouter>
        <Header />
        <div>Current valute is: {valute}</div>
        <SelectBasicValute currencies={currencies} valute={valute} setValute={setValute} />
        <Routes>
          <Route path="/" element={<Converter {...currencies} />} />
          <Route path="/rates" element={<ExchangeRates valute={valute} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
