import { GetStaticProps } from 'next'

import Layout from '../../components/Layout'
import List from '../../components/List'
import { useEffect, useState } from 'react'
import { Pokemon } from '../../models/pokemon'
import usePokemon from '../../hooks/use-pokemon'
import { ListType } from '../../enums/list-type.enum'

const WithStaticProps = () => {
  const [items, setItems] = useState()
  const { getGenerations, generations } = usePokemon()

  useEffect(() => {
    getGenerations()
  }, [])

  return (
    <Layout title="Generations - Saqara demo">
      <List items={generations} type={ListType.GENERATION} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const items: Pokemon[] = []
  return { props: { items } }
}

export default WithStaticProps
