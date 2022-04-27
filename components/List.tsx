import * as React from 'react'
import ListItem from './ListItem'
import { Pokemon } from '../models/pokemon'
import { Generation } from '../models/generation'
import { ListType } from '../enums/list-type.enum'

type Props = {
  items: Generation[] | Pokemon[]
  type: ListType
}

const List = ({ items, type }: Props) => {
  if (items && !items.length) {
    return <div className="m-auto text-center my-4">No result found !</div>
  }

  return (
    <div className="container mb-2 flex mx-auto w-full items-center justify-center">
      <ul className="flex flex-col p-4">
        {items &&
          items.map((item) =>
            type === ListType.GENERATION ? (
              <ListItem key={item.id} generation={item} />
            ) : (
              <ListItem key={item.id} pokemon={item} />
            )
          )}
      </ul>
    </div>
  )
}

export default List
