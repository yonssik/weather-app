import React from 'react';
import { useHistory } from 'react-router-dom';

import { importAll } from '../../../utils/utils';
import styles from './FavoriteForecast.module.scss';

const FavoriteForecast = props => {
    const history = useHistory();
    const icons = importAll(require.context('../../../assets/icons', false, /\.png/));

    return (
        <li className={styles.container}
            onClick={() => history.push("/home", { params: { city: props.city, country: props.country } })}>
            <h1>{props.city}, <span>{props.country}</span></h1>
            <h2>{props.temp}°</h2>
            <img src={icons[`${props.icon}.png`]} alt="" />
            <span>{props.description}</span>
            <button
                onClick={props.onRemoveItem}>Remove</button>
        </li>
    );
};

export default FavoriteForecast;