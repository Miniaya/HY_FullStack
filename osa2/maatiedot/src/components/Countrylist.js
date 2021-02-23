import React from 'react'
import Country from './Country'

const Countrylist = ({ countries, setFilter }) => {

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify your filter</p>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]} /> 
        )
    } else {
        return (
            <ul>
                {countries.map(country =>
                    <li key={country.name}>{country.name} <button onClick={() => setFilter(country.name)}>show</button></li>
                )}
            </ul>
        )
    }
}

export default Countrylist