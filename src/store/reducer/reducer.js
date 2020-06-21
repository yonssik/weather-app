import * as actionTypes from '../actions/actionTypes';
import { getFavorites, saveFavorites } from '../../utils/localStorage/localStorage';

const initialState = {
    currentCity: {
        city: '',
        country: '',
        id: 0,
        temp: 0,
        weather: {
            icon: '',
            main: '',
            description: ''
        },
        img: ''
    },
    error: null,
    fiveDayForecast: [],
    favoriteCities: getFavorites(),
    isLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CITY_TO_FAVORITES:
            const updatedCitysListAdd = [
                ...state.favoriteCities,
                action.addedCityId
            ];
            saveFavorites(updatedCitysListAdd);
            return {
                ...state,
                favoriteCities: updatedCitysListAdd
            };
        case actionTypes.REMOVE_CITY_FROM_FAVORITES:
            const updatedCitysListRemove = state.favoriteCities.filter(id => action.cityId !== id);
            saveFavorites(updatedCitysListRemove);
            return {
                ...state,
                favoriteCities: updatedCitysListRemove
            };
        case actionTypes.FETCH_FORECAST_SUCCESS:
            return {
                ...state,
                currentCity: action.currentCity,
                fiveDayForecast: action.fiveDayForecast,
                error: null,
                isLoading: false
            };
        case actionTypes.FETCHING_FORECAST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case actionTypes.FETCH_FAVORITES_END:
            return {
                ...state,
                isLoading: false
            };
        default: return state;
    };
};

export default reducer;