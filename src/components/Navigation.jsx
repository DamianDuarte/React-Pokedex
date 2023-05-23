import React, { useContext, useRef } from 'react'
import { Link, Outlet, useNavigate} from 'react-router-dom'
import { PokemonContext } from '../context/PokemonContext';




export const Navigation = () => {

  
  const {valueSearch, onInputChange, onResetForm, updateSearch } = useContext(PokemonContext);
  const inputRef = useRef(null);

//Boton borrar Zubats
const {handleLoadMore, removePokemon, clearSelection} = useContext(PokemonContext);

const handleRemove = () => {
   removePokemon();
   clearSelection();
 }

	

//Navegacion
	
  const navigate = useNavigate();

  const handleSubmit = e => {
	e.preventDefault();
	  updateSearch(inputRef.current.value);
	navigate('/search', {
		state: valueSearch,

	});

	onResetForm();
	
	
};


  return (
		<>
			<header className='flex bg-violet-400 items-center  justify-between pl-6 pr-6'>
				<Link to='/' className='w-60'>
				<img src="https://www.dropbox.com/s/jh2aosdo0dpvs1k/Pok%C3%A9dex_logo.png?raw=1" alt="Pokédex Logo"/>
				</Link>

				<form onSubmit={handleSubmit} className= 'flex gap-14' >
					<div >
						<input
						className="border border-gray-400 rounded-full p-3 w-96 text-center"
							type='search'
							name='valueSearch'
							id=''
							value={valueSearch}
							onChange={onInputChange}
							ref={inputRef}
							placeholder='Buscar nombre o habilidad de pokemon'
						/>
					</div>
				</form>
				<button onClick={handleRemove}  className="bg-crimson text-white rounded-full py-2 px-4 bg-red-500 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:bg-red-700">
					Eliminar Seleccion
				</button>
			</header>

			<Outlet />
		</>
	);
}
