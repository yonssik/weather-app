import React from 'react';

import { getDay, getMonth, importAll } from '../../../utils/utils';
import styles from './DailyForecast.module.scss';


const DailyForecast = props => {
    const icons = importAll(require.context('../../../assets/icons', false, /\.png/));
    const currentDate = new Date();

    return (
        <div className={styles.container}>
            <div className={styles.firstBlock}>
                <h5>{getDay(currentDate)}</h5>
                <p>{getMonth(currentDate)} {currentDate.getDate()}</p>
                <div />
                <button
                    onClick={() => props.addToFavorites(props.id)}
                    disabled={props.disabled}>
                    <svg className={styles.svgIcon} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm4 8h-3v3h-2v-3H8V8h3V5h2v3h3v2z"></path>
                    </svg>
                    <span>{!props.isFavorite ? 'Add to Favorites' : 'Remove from favorites'}</span>
                </button>
            </div>
            <div className={styles.secondBlock}>
                <h1>{props.temp}°</h1>
                <h5>{props.name}, {props.country}</h5>
                <img
                    src={icons[`${props.weather.icon}.png`]}
                    alt={props.weather.description} />
                <span>{props.weather.description}</span>
            </div>
        </div>
    );
};

export default DailyForecast;