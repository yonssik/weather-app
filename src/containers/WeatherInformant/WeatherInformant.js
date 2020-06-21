import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import DailyForecast from '../../components/Forecast/DailyForecast/DailyForecast';
import Search from '../Search/Search';
import FiveDayForecast from '../../components/Forecast/FiveDayForecast/FiveDayForecast';
import Modal from '../../components/UI/Modal/Modal';
import * as actionCreators from '../../store/actions/index';
import { saveFavorites } from '../../utils/localStorage/localStorage';
import styles from './WeatherInformant.module.scss';
import * as constants from '../../constants/constants';
import Spinner from '../../components/UI/Spinner/Spinner';

const WeatherInformant = props => {
    const { currentCity, favoriteCities, error, fiveDayForecast, isLoading } = useSelector(state => state);
    const [isFavorite, setIsFavorite] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Use Effect trigered in Weather informant -> location");
        const sucessCallback = ({ coords }) => {
            dispatch(actionCreators.fetchForecastStart({
                weather: `weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${constants.API_KEY}&units=metric`,
                forecast: `forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${constants.API_KEY}&units=metric`
            }));
        }

        const errorCallback = error => {
            console.log(error);
            dispatch(actionCreators.fetchFailed(error));
        };
        if ((location.state === undefined && location.state === null)
            || currentCity.city === '') {
            navigator.geolocation.getCurrentPosition(sucessCallback, errorCallback);
        } else {
            const { city, country } = location.state
                ? location.state.params
                : currentCity;
            if (currentCity.city !== city
                || currentCity.country !== country) {
                dispatch(actionCreators.fetchForecastStart({
                    weather: `weather?q=${city},${country}&appid=${constants.API_KEY}&units=metric`,
                    forecast: `forecast?q=${city},${country}&appid=${constants.API_KEY}&units=metric`
                }));
                history.replace("/home", undefined);
            }
        }
    }, [location]);

    const checkIfIsFavorite = () => {
        const inFavorites = favoriteCities.find(id => id === currentCity.id);
        if (inFavorites !== undefined) {
            setIsFavorite(true);
        } else setIsFavorite(false);
    }

    useEffect(() => {
        console.log('Use Effect trigered in Weather informant -> favorites ');
        checkIfIsFavorite();
        saveFavorites(favoriteCities);
        console.log(isFavorite);
    }, [favoriteCities, isFavorite, checkIfIsFavorite]);

    const fiveDayForecastComponent = fiveDayForecast.map(forecast => {
        return <FiveDayForecast
            key={forecast.date}
            temp={forecast.temp}
            date={new Date(forecast.date)}
            icon={forecast.weather.icon}
            description={forecast.weather.description} />;
    });

    return (
        <>
            <Modal
                show={error}
                modalClosed={() => dispatch(actionCreators.clearError())}>
                {error ? error.message : "Something went wrong!"}
            </Modal>
            <Search />
            {!isLoading
                ? <>
                    <DailyForecast
                        disabled={currentCity.city === '' ? true : false}
                        country={currentCity.country}
                        addToFavorites={!isFavorite
                            ? () => dispatch(actionCreators.addCityToFavorites(currentCity.id))
                            : () => dispatch(actionCreators.removeCityFromFavorites(currentCity.id))}
                        id={currentCity.id}
                        name={currentCity.city}
                        temp={currentCity.temp}
                        weather={currentCity.weather}
                        isFavorite={isFavorite} />
                    <div className={styles.container}>
                        {fiveDayForecastComponent}
                    </div>
                </>
                : <Spinner />}
        </>
    );
};

export default WeatherInformant;

// const convertTemperatureHandler = () => {
    //     if (tempUnits.units === 'celsius') {
    //         let fahrenheitUnits = (tempUnits.temp * 9 / 5) + 32;
    //         console.log(tempUnits);
    //         setTempUnits({
    //             units: 'fahrenheit',
    //             temp: fahrenheitUnits
    //         });
    //     } else if (tempUnits.units === 'fahrenheit') {
    //         let celsiusUnits = (tempUnits.temp - 32) * 5 / 9;
    //         console.log(tempUnits);
    //         setTempUnits({
    //             units: 'celsius',
    //             temp: celsiusUnits
    //         });
    //     }
    // };