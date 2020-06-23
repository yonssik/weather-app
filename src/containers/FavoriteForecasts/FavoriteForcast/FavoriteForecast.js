import React from 'react';
import { useHistory } from 'react-router-dom';

import { importAll } from '../../../utils/utils';
import styles from './FavoriteForecast.module.scss';

const FavoriteForecast = props => {
    const history = useHistory();
    const icons = importAll(require.context('../../../assets/icons', false, /\.png/));

    const normalizingString = str => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    };

    return (
        <li className={styles.container}>
            <h1>{props.city}, <span>{props.country}</span></h1>
            <h2>{props.temp}°</h2>
            <img src={icons[`${props.icon}.png`]} alt="" />
            <span>{props.description}</span>
            <button
                className={styles.removeButton}
                onClick={props.onRemoveItem}>Remove</button>
            <button
                className={styles.redirectButton}
                onClick={() => history.push("/home", { params: { city: normalizingString(props.city), country: props.country } })}>
                <img src={icons['redirect.png']} alt="redirect" />
            </button>
        </li>
    );
};

export default FavoriteForecast;