import * as actionTypes from '../actions/actionTypes';
import { getFavorites } from '../../utils/localStorage/localStorage';

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
    favoriteCities: getFavorites()
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CITY_TO_FAVORITES:
            const updatedCitysListAdd = [
                ...state.favoriteCities,
                action.addedCityId
            ];
            return {
                ...state,
                favoriteCities: updatedCitysListAdd
            };
        case actionTypes.REMOVE_CITY_FROM_FAVORITES:
            const updatedCitysListRemove = state.favoriteCities.filter(id => action.cityId !== id);
            return {
                ...state,
                favoriteCities: updatedCitysListRemove
            };
        case actionTypes.FETCH_FORECAST:
            return {
                ...state,
                currentCity: action.currentCity,
                fiveDayForecast: action.fiveDayForecast,
                error: null
            }
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error: action.error
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default: return state;
    };
};

export default reducer;