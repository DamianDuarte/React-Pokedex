import React, { useContext, useEffect } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import { useLocation } from 'react-router-dom';
import { PokemonCard } from '../components';

export const SearchPage = () => {
  /* const location = useLocation(); */
  const {  byName, byAbility, filterPokemon, filterAbility } = useContext(PokemonContext);

  /* //Busqueda filtrada por nombre
  const  filterPokemon = list.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()));

  //Busqueda filtrada por habilidad
  let filterAbility = location.state.toLowerCase().split(',');
  filterAbility = filterAbility.map(ability => ability.trim());
  filterAbility = abilityPokemon.filter(ability => filterAbility.includes(ability.name.toLowerCase()))

  const abiTotal = []

  filterAbility.forEach(ability => {
    ability.pokemon.forEach(pokemon => {

      abiTotal.push(pokemon.pokemon)
    })
  })

  useEffect(() => {
    updateByName(filterPokemon);
  updateByAbility(abiTotal);
  }, []) */
  
  
  /* ....................................................................... */
  
  return (
    <>
      
        <div>
          <div className='flex justify-around flex-wrap'>
            {byName.filter(pokemon => filterPokemon.find(p => p.name == pokemon.name)).map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      
        <div>
          <div className='flex justify-around flex-wrap'>
          {byAbility.filter(pokemon => filterAbility.find(p => p.name == pokemon.name)).map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>

    </>
  );
}
