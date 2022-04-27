import gql from 'graphql-tag'

export const getGenerationsQuery = gql`
  query getGenerations($limit: Int, $offset: Int) {
    generations: pokemon_v2_generation {
      id
      name
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const getGenerationByIdQuery = gql`
  query getGenerationById($id: Int, $limit: Int, $offset: Int) {
    generations: pokemon_v2_generation(where: { id: { _eq: $id } }) {
      name
      id
      pokemon_species: pokemon_v2_pokemonspecies_aggregate(
        limit: $limit
        offset: $offset
      ) {
        nodes {
          id
          name
        }
      }
    }
  }
`

export const searchPokemonsQuery = gql`
  query searchPokemons($generationId: Int, $seachValue: String) {
    pokemon_v2_pokemonspecies(
      where: {
        _and: {
          generation_id: { _eq: $generationId }
          name: { _eq: $seachValue }
        }
      }
    ) {
      id
      name
      generation_id
    }
  }
`
