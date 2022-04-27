import Link from 'next/link'

const Header = () => {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Link href="/generations">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900 mr-2">
                Generations
              </a>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/generations">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                Generations
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header
