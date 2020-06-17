import React from 'react';

import { getDay, importAll } from '../../../utils/utils';
import styles from './FiveDayForecast.module.scss';

const FiveDayForecast = props => {
    const icons = importAll(require.context('../../../assets/icons', false, /\.png/));
    
    return (
        <div className={styles.container}>
            <h5>{getDay(props.date)}</h5>
            <img src={icons[`${props.icon}.png`]} alt={props.description} />
            <h5>{props.temp}°</h5>
        </div>
    );
};

export default FiveDayForecast;