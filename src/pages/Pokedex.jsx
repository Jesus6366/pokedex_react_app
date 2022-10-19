import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardPoke from '../components/pokedex/CardPoke'
import InputSearch from '../components/pokedex/InputSearch'
import SelectByType from '../components/pokedex/SelectByType'
import "./styles/header.css"
import "../components/pokedex/styles/pokedex.css"
import Pagination from '../components/pokedex/Pagination'

const Pokedex = () => {

    const [pokemons, setPokemons] = useState()
    const [typeSelected, setTypeSelected] = useState("All Pokemons")


    useEffect(() => {
        if (typeSelected !== "All Pokemons") {
            axios.get(typeSelected)
                .then(res => {
                    const result = res.data.pokemon.map(e => e.pokemon)
                    setPokemons(result)
                })
                .catch(err => console.log(err))
        } else {
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
            axios.get(URL)
                .then(res => setPokemons(res.data.results))
                .catch(err => console.log(err))
        }
    }, [typeSelected])


    const userName = useSelector(state => state.userName)

    //Logica de paginacion 
    const [page, setPage] = useState(1)
    const [pokePerPage, setpokePerPage] = useState(8)
    const initialPoke = (page - 1) * pokePerPage
    const finalPoke = page * pokePerPage



    return (
        <div>
            <header>
                <div className='pokedex__background'>
                    <img className='pokedex__img-header' src='/images/home/image12.png' alt="" />
                </div>
                <div className='pokedex__welcome-span'>
                    <p className='pokedex__welcome'>Welcome <span className='pokedex__span'>{userName}</span>,</p>
                    <p>here you can find your favorite Pokemon.</p>
                </div>
            </header >
            <aside>
                <InputSearch />
                <SelectByType setTypeSelected={setTypeSelected} setPage={setPage} />
                <Pagination
                    page={page}
                    pagesLength={pokemons && Math.ceil(pokemons.length / pokePerPage)}
                    setPage={setPage}
                />
            </aside>
            <main>
                <div className='card-container'>
                    {
                        pokemons?.slice(initialPoke, finalPoke).map(pokemon => (
                            <CardPoke
                                key={pokemon.url}
                                url={pokemon.url}

                            />
                        ))
                    }
                </div>
            </main>

        </div >
    )
}

export default Pokedex