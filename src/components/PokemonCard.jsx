import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../helper/helper'
import { PokemonContext } from '../context/PokemonContext';

export const PokemonCard = ({pokemon}) => {

	const {selection, selectPokemon, unselectPokemon} = useContext(PokemonContext);
	const handleSelect = (e) => {
		if(e.target.checked){
			selectPokemon(pokemon);
		}else{
			unselectPokemon(pokemon);
		}
	}

  return (
	<>
	<div className='relative flex flex-row rounded-md shadow-md border border-purple-300 p-4 max-w-md mt-8'>
	<Link to={`/pokemon/${pokemon.id}`}>
			<div>
				<img
					className='w-48 h-48'
					src={pokemon.sprites.other.home.front_default}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			<div >
				<span className='text-center'>N° {pokemon.id}</span>
				<h3 className='font-medium'>{capitalize(pokemon.name)}</h3>
				<div >
					{pokemon.types.map(type => (
						<span key={type.type.name} className='text-sm text-justify rounded-full border pl-2 pr-2 '>
							{capitalize(type.type.name)}
						</span>
					))}
				</div>
			</div>
		</Link>
		<input className='absolute bottom-0 right-0 m-3'
		type="checkbox" 
		value=
		{
			selection.find(p => p.name === pokemon.name) ? true : false
		}
		onClick={handleSelect} 
		/>
	</div>
    
	</>

  )
}
