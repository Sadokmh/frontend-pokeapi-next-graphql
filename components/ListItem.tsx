import React from 'react'
import Link from 'next/link'
import { Pokemon } from '../models/pokemon'
import { Generation } from '../models/generation'
import { formatName } from '../utils'

type Props = {
  generation?: Generation
  pokemon?: Pokemon
}

const ListItem = ({ generation, pokemon }: Props) => (
  <li className="border-gray-400 flex flex-row mb-2">
    <div className="select-none flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">
      <div className="flex-1 pl-1 mr-16">
        <div className="font-medium">
          {generation ? formatName(generation.name) : pokemon.name}
        </div>
      </div>
      {generation && (
        <div>
          <Link href={`/generations/${generation.id}`}>
            <div className="w-full text-wrap text-center flex text-white text-bold flex-col rounded-md bg-red-500 justify-center items-center mr-10 p-2">
              {generation?.count}
            </div>
          </Link>
          <div className="flex justify-center">
            <small>Pokemons</small>
          </div>
        </div>
      )}
    </div>
  </li>
)

export default ListItem
