import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cities from 'cities.json';

import * as actionCreators from '../../store/actions/index';
import styles from './Search.module.scss';
import * as constants from '../../constants/constants';

const Search = React.memo(props => {
    const [input, setInput] = useState('');
    const [autoComplete, setAutoComplete] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (input.length > 2) {
            let arrayLimit = 0;
            const capitalized = input.replace(/^./, input[0].toUpperCase());
            const suggestions = cities.filter(city => {
                if (city.name.startsWith(capitalized) && arrayLimit !== 15) {
                    arrayLimit++;
                }
                return city.name.startsWith(capitalized) && (arrayLimit !== 15);
            });
            setAutoComplete(suggestions);
        } else {
            setAutoComplete([]);
        }
    }, [input]);

    const searchCityForecast = ({ name, country }) => {
        dispatch(actionCreators.fetchForecastStart({
            weather: `weather?q=${name},${country}&appid=${constants.API_KEY}&units=metric`,
            forecast: `forecast?q=${name},${country}&appid=${constants.API_KEY}&units=metric`
        }));

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