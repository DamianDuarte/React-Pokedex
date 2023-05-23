import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Error404, HomePage, PokemonPage, SearchPage } from './pages'
export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<HomePage/>}/>
          <Route path='pokemon/:id' element={<PokemonPage/>}/>
          <Route path='search' element={<SearchPage/>}/>
        </Route>
        <Route path='*' element={<Error404/>}/>
    </Routes>
  )
}
