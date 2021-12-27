export type Currencies = {
  [key: string]: string
}

export type Valute = {
  [keys: string]: number
}

export type S = {
  [keys: string]: number
}

export type Rates = {
  date: string
  rates: Valute
}

const s: Rates = {
  date: "",
  rates: {
    s: 0,
    ss: 1
  }
}