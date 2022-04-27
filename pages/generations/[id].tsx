import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/Layout'
import usePokemon from '../../hooks/use-pokemon'
import { formatName } from '../../utils'
import List from '../../components/List'
import { ListType } from '../../enums/list-type.enum'
import { Pokemon } from '../../models/pokemon'

type Props = {
  errors?: string
}

const StaticPropsDetail = ({ errors }: Props) => {
  const {
    getGenerationById,
    generation,
    searchPokemon,
    pokemon,
    cancelSearch,
  } = usePokemon()
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [limit, setLimit] = useState<number>(5)
  const [offset, setOffset] = useState<number>(0)
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    if (id) {
      getGenerationById(+id, limit, offset)
    }
  }, [id, limit, offset])

  useEffect(() => {
    if (generation) {
      const updatedPokemons: Pokemon[] = [...pokemons]
      updatedPokemons.push(...generation?.pokemons)
      setPokemons(updatedPokemons)
    }
  }, [generation])

  const onLoadMore = () => {
    setOffset(offset + 5)
  }

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      searchPokemon(generation.id, searchValue)
    }
  }

  const onCancelSearch = () => {
    setSearchValue('')
    cancelSearch()
  }

  if (errors) {
    return <Layout title="Error | Next.js + TypeScript Example"></Layout>
  }

  return (
    <Layout
      title={
        generation?.name
          ? formatName(generation.name)
          : 'Generation overview - Saqara Demo'
      }
    >
      <div>
        {generation && (
          <div>
            <div className="w-1/5 mt-5 text-wrap text-center text-white text-bold flex-col rounded-md bg-red-500  p-5 m-auto">
              {formatName(generation?.name)}
            </div>
            <div className="mb-4 w-1/5 mt-4 m-auto">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Search
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyUp={(e) => onSearch(e)}
                />
              </div>
            </div>
            <div>
              <List
                items={pokemon ? pokemon : pokemons}
                type={ListType.POKEMON}
              />
              <div className="flex justify-center mb-6">
                {pokemon ? (
                  <button
                    className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                    onClick={() => onCancelSearch()}
                  >
                    Back
                  </button>
                ) : (
                  <button
                    className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                    onClick={() => onLoadMore()}
                  >
                    Load more pokemons
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    const item = { id }
    return { props: { item } }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}
