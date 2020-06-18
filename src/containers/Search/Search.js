import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cities from 'cities.json';
import jsesc from 'jsesc';

import * as actionCreators from '../../store/actions/index';
import styles from './Search.module.scss';
import * as constants from '../../constants/constants';

const Search = React.memo(props => {
    const history = useHistory();
    const [input, setInput] = useState('');
    const [autoComplete, setAutoComplete] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (input.length > 2) {
            let arrayLimit = 0;
            const capitalized = capitalizeEachWord(input);
            const suggestions = cities.filter(city => {
                const normalizedStr = normilizingString(city.name);
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

    const normilizingString = str => {
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
                city: normilizingString(name),
                country: country
            }
        });
        // dispatch(actionCreators.fetchForecastStart({
        //     weather: `weather?q=${normilizingString(name)},${country}&appid=${constants.API_KEY}&units=metric`,
        //     forecast: `forecast?q=${normilizingString(name)},${country}&appid=${constants.API_KEY}&units=metric`
        // }));
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