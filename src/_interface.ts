export interface CityData {
  city: string
  growth_from_2000_to_2013: string
  latitude: number
  longitude: number
  population: string
  rank: string
  state: string
}

export enum Status {
  ERR = 'error',
  LOAD = 'loading',
  NORESULT = 'noResult',
  PROHIBIT = 'prohibit'
}
