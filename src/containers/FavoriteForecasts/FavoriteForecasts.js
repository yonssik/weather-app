import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './FavoriteForecasts.module.scss';
import * as constants from '../../constants/constants';
import FavoriteForecast from './FavoriteForcast/FavoriteForecast';
import * as actionCreators from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

const FavoriteForecasts = props => {
    const { favoriteCities, isLoading } = useSelector(state => state);
    const error = useSelector(state => state.error);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                dispatch(actionCreators.fetchingForecast());
                let favoritesListRepos = favoriteCities.map(id => {
                    const query = `id=${id}&appid=${constants.API_KEY}&units=metric`;
                    return `http://api.openweathermap.org/data/2.5/weather?${query}`;
                });

                const promises = favoritesListRepos.map(async repo => {
                    try {
                        const response = await axios.get(repo);
                        return response;
                    } catch (e) {
                        if (!error) {
                            dispatch(actionCreators.fetchFailed({
                                cod: null,
                                message: e.message
                            }));
                        }
                    }
                });

                dispatch(actionCreators.fetchFavoritesEnd());
                const response = await Promise.all(promises);
                setData(response);
            } catch (e) {
                dispatch(actionCreators.fetchFailed({
                    cod: null,
                    message: e.message
                }));
            }
        };

        fetchFavorites();
    }, [favoriteCities, dispatch, error]);

    const removeItemFromFavoritesHandler = id => {
        dispatch(actionCreators.removeCityFromFavorites(id));
    };


    let favoritesList = data ? data.map(forecast => (
        <FavoriteForecast
            key={forecast.data.id}
            city={forecast.data.name}
            country={forecast.data.sys.country}
            temp={Math.round(forecast.data.main.temp)}
            icon={forecast.data.weather[0].icon}
            description={forecast.data.weather[0].description}
            onRemoveItem={() => removeItemFromFavoritesHandler(forecast.data.id)} />
    )) : null;

    return (
        <>
            <Modal show={error}
                modalClosed={() => dispatch(actionCreators.clearError())}>
                {error ? error.message : 'Something went wrong'}
            </Modal>
            {
                !isLoading
                    ? <ul className={styles.container}>
                        {favoritesList}
                    </ul>
                    : <Spinner />
            }
        </>
    );
};

export default FavoriteForecasts;