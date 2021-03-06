import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const addCityToFavorites = (id) => {
    return {
        type: actionTypes.ADD_CITY_TO_FAVORITES,
        addedCityId: id
    };
};

export const removeCityFromFavorites = (id) => {
    return {
        type: actionTypes.REMOVE_CITY_FROM_FAVORITES,
        cityId: id
    };
};

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_FAILED,
        error: error
    };
};

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    };
};

export const fetchForecastSuccess = (dailyForecast, fiveDayForecast, image) => {
    const weather = {
        icon: dailyForecast.weather[dailyForecast.weather.length - 1].icon,
        main: dailyForecast.weather[dailyForecast.weather.length - 1].main,
        description: dailyForecast.weather[dailyForecast.weather.length - 1].description
    };

    const fiveDayForecastList = [];
    for (let i = 0; i < fiveDayForecast.list.length; i += 8) {
        fiveDayForecastList.push(fiveDayForecast.list[i]);
    }

    const fiveDayForecastState = fiveDayForecastList.map(day => {
        return {
            date: day.dt_txt,
            temp: Math.round(day.main.temp),
            weather: {
                icon: day.weather[0].icon,
                main: day.weather[0].main,
                description: day.weather[0].description
            }
        }
    });

    return {
        type: actionTypes.FETCH_FORECAST_SUCCESS,
        currentCity: {
            isFetched: true,
            city: dailyForecast.name,
            country: dailyForecast.sys.country,
            id: dailyForecast.id,
            temp: Math.round(dailyForecast.main.temp),
            weather: weather,
            img: image
        },
        fiveDayForecast: fiveDayForecastState
    };
};

export const fetchingForecast = () => {
    return {
        type: actionTypes.FETCHING_FORECAST
    };
};

export const fetchFavoritesEnd = () => {
    return {
        type: actionTypes.FETCH_FAVORITES_END
    };
};

export const fetchForecastStart = ({ weather, forecast }) => {
    return async dispatch => {
        try {
            dispatch(fetchingForecast());
            let image = null;
            const responseDailyForecast = await axios.get(
                `https://api.openweathermap.org/data/2.5/${weather}`
            );
            const responseFiveDayForecast = await axios.get(
                `https://api.openweathermap.org/data/2.5/${forecast}`
            );

            const imgResponse = await axios.get(`https://api.unsplash.com/search/photos/?client_id=nTTpXnsIZ18QL4ttNyR15jJN5rX82Pxc9Vxb_vWpSZA&query=${responseDailyForecast.data.name}`, {
                header: 'Accept-Version: v1'
            });
            if (imgResponse.data.results.length !== 0) {
                image = imgResponse.data.results[Math.round(Math.random() * (imgResponse.data.results.length - 1))].urls.regular;
            }

            dispatch(fetchForecastSuccess(responseDailyForecast.data, responseFiveDayForecast.data, image));
        } catch (error) {
            dispatch(fetchFailed({
                code: error.response.data ? error.response.data.cod : null,
                message: error.response.data ? error.response.data.message : error.message
            }));
        }
    };
};