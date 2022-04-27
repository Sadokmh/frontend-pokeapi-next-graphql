import request from 'graphql-request'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Generation } from '../models/generation'
import { Pokemon } from '../models/pokemon'
import {
  getGenerationByIdQuery,
  getGenerationsQuery,
  searchPokemonsQuery,
} from '../graphql/queries/queries'

const API_URL = 'https://beta.pokeapi.co/graphql/v1beta'

const usePokemon = () => {
  const [generations, setGenerations] = useState<Generation[]>(null)
  const [generation, setGeneration] = useState<Generation>()
  const [pokemon, setPokemon] = useState<Pokemon[]>()

  const [id, setId] = useState<number>(-1)
  const [limit, setLimit] = useState<number>(5)
  const [offset, setOffset] = useState<number>(0)

  const [generationId, setGenerationId] = useState<number>(-1)
  const [seachValue, setSeachValue] = useState<string>('')

  const getGenerationsParams = useQuery(
    'generations',
    async () => {
      const { generations } = await request(API_URL, getGenerationsQuery)
      return generations
    },
    {
      enabled: false,
    }
  )

  const getGenerationsByIdParams = useQuery(
    'generationById',
    async () => {
      const { generations } = await request(API_URL, getGenerationByIdQuery, {
        id,
        limit,
        offset,
      })
      return generations
    },
    {
      enabled: false,
    }
  )

  const searchPokemonsParams = useQuery(
    'seachPokemons',
    async () => {
      const { pokemon_v2_pokemonspecies } = await request(
        API_URL,
        searchPokemonsQuery,
        {
          generationId,
          seachValue,
        }
      )
      return pokemon_v2_pokemonspecies
    },
    {
      enabled: false,
    }
  )

  const getGenerations = () => {
    getGenerationsParams.refetch()
  }

  const getGenerationById = (id: number, limit: number, offset: number) => {
    setId(id)
    setLimit(limit)
    setOffset(offset)
  }

  const searchPokemon = (generationId: number, searchValue: string) => {
    setGenerationId(generationId)
    setSeachValue(searchValue)
  }

  const cancelSearch = () => {
    setSeachValue('')
    setPokemon(null)
  }

  useEffect(() => {
    if (id !== -1) {
      getGenerationsByIdParams.refetch()
    }
  }, [id, offset, limit])

  useEffect(() => {
    if (generationId !== -1 && seachValue) {
      searchPokemonsParams.refetch()
    }
  }, [generationId, seachValue])

  useEffect(() => {
    const { data } = getGenerationsParams
    if (data && data?.length) {
      const items: Generation[] = data?.map(({ pokemon_species, ...rest }) => ({
        ...rest,
        count: pokemon_species?.aggregate?.count,
      }))
      setGenerations(items)
    }
  }, [getGenerationsParams.data])

  useEffect(() => {
    const { data } = getGenerationsByIdParams
    if (data && data.length && data[0].id === id) {
      const item: Generation = {
        id: data[0].id,
        name: data[0].name,
        pokemons: data[0].pokemon_species?.nodes,
      }
      setGeneration(item)
      setPokemon(null)
    }
  }, [getGenerationsByIdParams.data])

  useEffect(() => {
    const { data } = searchPokemonsParams
    if (data) {
      setPokemon(data)
    }
  }, [searchPokemonsParams.data])

  return {
    getGenerations,
    getGenerationById,
    generations,
    pokemon,
    generation,
    searchPokemon,
    cancelSearch,
  }
}

export default usePokemon
