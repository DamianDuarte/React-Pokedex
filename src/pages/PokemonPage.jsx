import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import { Loader } from '../components';
import { useParams } from 'react-router-dom';
import { capitalize } from '../helper/helper';

export const PokemonPage = () => {

  const {getPokemonById} = useContext(PokemonContext);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const {id} = useParams();

  const getPokemon = async (id) => {
    const data = await getPokemonById(id);
    setPokemon(data);
    setLoading(false);
  }

  useEffect(() => {
    getPokemon(id);
  }, []);


  return (

    <main>

      {
        loading ? (<Loader /> ) :
        <>
        <div>
          <span className='text-7xl font-extrabold text-purple-900 mt-9'>#{pokemon.id}</span>
          <div className='flex justify-items-center justify-center align-middle' >
            <img
              
              src={pokemon.sprites.other.home.front_default}
              alt={`Pokemon ${pokemon?.name}`}
            />
          </div>

          <div >
            <h1 className='text-center text-9xl font-medium underline decoration-purple-600'>{capitalize(pokemon.name)}</h1>
            <div >
              {pokemon.types.map(type => (
                <span key={type.type.name} className='text-center text-6xl font-normal underline0'>
                  {type.type.name}
                </span>
              ))}
            </div>
            <div >
              <div >
                <p>Altura</p>
                <span>{pokemon.height}</span>
              </div>
              <div >
                <p>Peso</p>
                <span>{pokemon.weight}KG</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1>Habilidades</h1>
          <span>
            {

              pokemon.abilities.map(ability => (
                <span key={ability.ability.name}>
                  {capitalize(ability.ability.name)}
                </span>
              ))

            }
          </span>
        </div>

        <div >
          <h1>Estadísticas</h1>
          <div >
            <div >
              <span>Hp</span>
              <div ></div>
              <span >
                {pokemon.stats[0].base_stat}
              </span>
            </div>
            <div >
              <span>Attack</span>
              <div ></div>
              <span >
                {pokemon.stats[1].base_stat}
              </span>
            </div>
            <div >
              <span>Defense</span>
              <div ></div>
              <span >
                {pokemon.stats[2].base_stat}
              </span>
            </div>
            <div >
              <span>Special Attack</span>
              <div ></div>
              <span>
                {pokemon.stats[3].base_stat}
              </span>
            </div>
            <div >
              <span>Special Defense</span>
              <div ></div>
              <span >
                {pokemon.stats[4].base_stat}
              </span>
            </div>
            <div>
              <span>Speed</span>
              <div></div>
              <span >
                {pokemon.stats[5].base_stat}
              </span>
            </div>
          </div>
        </div>
      </>
      }

    </main>
    
  )
}
