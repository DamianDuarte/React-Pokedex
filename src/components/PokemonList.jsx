import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import { PokemonCard } from './PokemonCard';
import { Loader } from './Loader';

export const PokemonList = () => {

  const {allPokemon, loading} = useContext(PokemonContext);

  return (
    <>

    {
      loading ? (<Loader />) : (

      <div className='flex justify-around flex-wrap'>
        

      {allPokemon.map(pokemon => (
								<PokemonCard pokemon={pokemon} key={pokemon.id} />
							))}

      </div>
      ) 
    }


    </>
  )
}
