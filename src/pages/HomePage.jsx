import React, { useContext } from 'react'
import { PokemonList } from '../components'
import { PokemonContext } from '../context/PokemonContext';


export const HomePage = () => {

  const {handleLoadMore} = useContext(PokemonContext);


  return (
    <>
				<h1 className='font-serif item-center text-center mt-5 font-bold underline underline-offset-2 text-7xl'>Lista de Pokemon</h1>
			<div className=''>
			<PokemonList />
      </div>
            <div className='flex item-center justify-center justify-items-center self-center '>
                <button onClick={handleLoadMore} className=' bg-crimson text-white rounded-full py-2 px-4 bg-purple-500 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:bg-purple-700 m-24 w-72 text-2xl' >
                    Cargar más
                </button>
            </div>
		</>
  )
}
