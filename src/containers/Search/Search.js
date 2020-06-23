import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import cities from 'cities.json';

import styles from './Search.module.scss';

const Search = React.memo(props => {
    const history = useHistory();
    const [input, setInput] = useState('');
    const [autoComplete, setAutoComplete] = useState([]);

    useEffect(() => {
        if (input.length > 2) {
            let arrayLimit = 0;
            const capitalized = capitalizeEachWord(input);
            const suggestions = cities.filter(city => {
                const normalizedStr = normalizingString(city.name);
                if (normalizedStr.includes(capitalized) && arrayLimit !== 15) {
                    arrayLimit++;
                }
                return normalizedStr.includes(capitalized) && (arrayLimit !== 15);
            });
            setAutoComplete(suggestions);
        } else {
            setAutoComplete([]);
        }
    }, [input]);

    const normalizingString = str => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    };

    const capitalizeEachWord = str => {
        return str.replace(/(^\w|\s\w)/g, str => {
            return str.toUpperCase();
        });
    };

    const searchCityForecast = ({ name, country }) => {
        history.push("/home", {
            params: {
                city: normalizingString(name),
                country: country
            }
        });
        setInput('');
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={input}
                onChange={event => { setInput(event.target.value) }}
                placeholder="Search..." />
            <button onClick={() => setInput('')}>X</button>
            <ul className={styles.suggestions}>
                {autoComplete.map(city => (
                    <li
                        key={city.lat}
                        onClick={() => searchCityForecast(city)}>{city.name},
                        <span> {city.country}</span>
                    </li>))}
            </ul>
        </div>
    );
});

export default Search;