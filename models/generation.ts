import { Pokemon } from './pokemon'

export type Generation = {
  id: number
  name: string
  count?: number
  pokemons?: Pokemon[]
}
