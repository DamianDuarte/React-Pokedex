import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hooks/useForm";

export const PokemonProvider = ({ children }) => {

//States de carga
    const [loading, setLoading] = useState(true);

//State de filtrado
    const [active, setactive] = useState(false);


//States de los pokemon

    const [list, setList] = useState([]);

    const [allPokemon, setAllPokemon] = useState([]);

    const [globalPokemon, setGlobalPokemon] = useState([]);

    const [offset, setOffset] = useState(0);

//State tipos de pokemon
    const [typePokemon, setTypePokemon] = useState([]);

//State habilidades de pokemon
    const [abilityPokemon, setAbilityPokemon] = useState([]);

// State de busqueda por nombre y habilidad
    const [byName, setByName] = useState([]);
    const [byAbility, setByAbility] = useState([]);

// State de pokemon filtrados
    const [filterPokemon, setFilterPokemon] = useState([]);
    const [filterAbility, setFilterAbility] = useState([]);

//State para seleccionar eliminado de pokemon
    const [selection, setSelection] = useState([]);

//Custom Hook formulario
    const {valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    });
    
    


    //Lllamar 50 pokemon a la API
    const getpokemon = async (limit = 30) => {
        const url = `https://pokeapi.co/api/v2/`;

        const res = await fetch(`${url}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();



        const details = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;

        });

        const results = await Promise.all(details);

        setAllPokemon([
            ...allPokemon,
            ...results
        ]);
        setLoading(false);

    }

    //Obtener toda la lista de pokemon
    const pokemonList = async () => {
        const url = `https://pokeapi.co/api/v2/`;

        const res = await fetch(`${url}pokemon?limit=1500&offset=0`);
        const data = await res.json();

        setList(data.results);
    }

    useEffect(() => {
        pokemonList();
    }, []);



    //Llamar a todos los detalles de pokemon
    const getAllPokemon = async () => {
        const url = `https://pokeapi.co/api/v2/`;

        const res = await fetch(`${url}pokemon?limit=1500&offset=0`);
        const data = await res.json();


        const details = data.results.slice(0,10).map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;

        });


        const results = await Promise.all(details);

        setGlobalPokemon(results);
        setLoading(false);
    }

    //Llamar a los pokemon por ID
    const getPokemonById = async (id) => {
        const url = `https://pokeapi.co/api/v2/`;

        const res = await fetch(`${url}pokemon/${id}`);
        const data = await res.json();

        return data;
    }

    useEffect(() => {
        getpokemon();
    }, [offset]);

    useEffect(() => {
        getAllPokemon();
    }, []);


    //Boton de cargar mas pokemon

    const handleLoadMore = () => {
        setOffset(offset + 30);

    }

    //Todos los tipos de pokemon

    const getTypes = async () => {
        const url = `https://pokeapi.co/api/v2/`;
        const res = await fetch(`${url}type`);
        const data = await res.json();


        const details =  data.results.map(async (type) => {
            const res = await fetch(type.url);
            const data = await res.json();
            return data;
        });

        const results = await Promise.all(details);


        setTypePokemon(results);


    }

    useEffect(() => {
        getTypes();
    }, []);

    //Todos las habilidades de pokemon

    const getAbilities = async () => {
        const url = `https://pokeapi.co/api/v2/`;
        const res = await fetch(`${url}ability?limit=400&offset=0`);
        const data = await res.json();

        const details =  data.results.map(async (ability) => {
            const res = await fetch(ability.url);
            const data = await res.json();
            return data;

        });


        const results = await Promise.all(details);


        setAbilityPokemon(results);
    }

    useEffect(() => {
        getAbilities();
    }, []);

    //Filtrado de pokemon por nombre y habilidad

    const updateByName = async(listToFetch) => {
        console.log('listtoFetch updateByName', listToFetch);
        listToFetch = listToFetch.map(async(pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })
        
        const results = await Promise.all(listToFetch);
        setByName(results);
    }

    const updateByAbility = async(listToFetch) => {
        console.log('listtoFetch updateByAbility', listToFetch);
        listToFetch = listToFetch.map(async(pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })
        
        const results = await Promise.all(listToFetch);
        setByAbility(results);         
    }

    const updateSearch = async (valueSearch) => {
        //Busqueda filtrada por nombre
	const  filterPokemon = list.filter(pokemon => pokemon.name.includes(valueSearch.toLowerCase()));
        setFilterPokemon(filterPokemon);
  
	//Busqueda filtrada por habilidad
	let filterAbility = valueSearch.toLowerCase().split(',');
	filterAbility = filterAbility.map(ability => ability.trim());
	filterAbility = abilityPokemon.filter(ability => filterAbility.includes(ability.name.toLowerCase()))
  
	const abiTotal = []
  
	filterAbility.forEach(ability => {
	  ability.pokemon.forEach(pokemon => {
        
		abiTotal.push(pokemon.pokemon)
	  })
	})
    setFilterAbility(abiTotal);
  
	updateByName(filterPokemon);
	updateByAbility(abiTotal);
        
}

    //Remover pokemon de la lista

    const removePokemon = () => {
        const newList = list.filter(pokemon => !selection.find(p => p.name === pokemon.name));
        const newByName = byName.filter(pokemon => !selection.find(p => p.name === pokemon.name));
        const newByAbility = byAbility.filter(pokemon => !selection.find(p => p.name === pokemon.name));
        const newGetPokemon = allPokemon.filter(pokemon => !selection.find(p => p.name === pokemon.name));
        setList(newList);
        setByName(newByName);
        setByAbility(newByAbility);
        setAllPokemon(newGetPokemon);
    }

    const selectPokemon = (pokemon) => {
        setSelection([...selection, pokemon]);
    }

    const unselectPokemon = (pokemon) => {
        const newList = selection.filter(p => p.name !== pokemon.name);
        setSelection(newList);
    }

    const clearSelection = () => {
        setSelection([]);
    }


        /* ....................................................................... */

    return (
        <PokemonContext.Provider value={
            {
                //Formulario
                valueSearch,
                onInputChange,
                onResetForm,
                //Pokemon
                list,
                allPokemon,
                globalPokemon,
                getPokemonById,
                //fetch details
                updateByName,
                updateByAbility,
                byName,
                byAbility, 
                //Tipos
                typePokemon,
                //Habilidades
                abilityPokemon,
                //Carga
                handleLoadMore,
                //loading
                loading,
                setLoading,
                //Barra estilo
                active,
                setactive,
                //filtro de busqueda
                filterPokemon,
                filterAbility,
                updateSearch,
                //Remover pokemon
                removePokemon,
                //Seleccionar pokemon
                selection,
                selectPokemon,
                unselectPokemon,
                clearSelection
            }
        }>
        {children}
        </PokemonContext.Provider>
    );
}