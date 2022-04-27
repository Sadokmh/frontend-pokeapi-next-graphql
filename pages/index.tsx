import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home - Saqara Demo">
    <div className="bg-white  border-t-4 border-orange-600 h-full">
      <div className="container mx-auto px-6 py-4">
        <div className="text-center">
          <h1 className="font-medium text-xl mb-10">Welcome to pokemons API</h1>
          <a
            className="flex items-center justify-center text-gray-800 hover:text-indigo-600"
            href="#"
          >
            <svg
              className="h-6 w-6 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <Link href="/generations">
              <span className="mx-3 font-medium text-sm md:text-base">
                Explore Pokemons
              </span>
            </Link>
          </a>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
