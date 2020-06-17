import { useReducer, useCallback } from 'react';
import axios from 'axios';

const initialState = {
    loading: false,
    errorMessage: null,
    data: null
};

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                errorMessage: null,
                data: null
            };
        case 'RESPONSE':
            return {
                ...currentHttpState,
                loading: false,
                data: action.data
            };
        case 'ERROR':
            return {
                loading: false,
                errorMessage: action.errorMessage,
                data: null
            };
        case 'CLEAR':
            return initialState;
        default: throw new Error('HTTP_REDUCER: Should not be reached!');
    }
};

export const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => {
        dispatchHttp({ type: 'CLEAR' });
    }, []);

    const sendHttpRequest = useCallback(async (url) => {
        console.log('In useHttp HOOK');
        dispatchHttp({ type: 'SEND' });
        try {
            const response = await axios.get(url);
            console.log(`In useHttp hook ${response}`);
            const data = await response.json();
            console.log('Defore dispatch in useHttp hook');
            await dispatchHttp({ type: 'RESPONSE', data: data });
            console.log('After dispatch in useHttp hook');
        } catch (error) {
            dispatchHttp({ type: 'ERROR', errorMessage: error.response });
        }
    }, []);

    return [
        sendHttpRequest,
        httpState.data,
        httpState.loading,
        httpState.errorMessage,
        clear
    ];
};

// import { useReducer, useCallback } from 'react';

// const initialState = {
//     loading: false,
//     errorMessage: null,
//     data: null,
//     extra: null,
//     identifier: null
// };

// const httpReducer = (currentHttpState, action) => {
//     switch (action.type) {
//         case 'SEND':
//             return {
//                 loading: true,
//                 errorMessage: null,
//                 data: null,
//                 extra: null,
//                 identifier: action.identifier
//             };
//         case 'RESPONSE':
//             return {
//                 ...currentHttpState,
//                 loading: false,
//                 data: action.responseData,
//                 extra: action.extra
//             };
//         case 'ERROR':
//             return {
//                 loading: false,
//                 errorMessage: action.errorMessage,
//                 data: null,
//                 extra: null
//             };
//         case 'CLEAR':
//             return initialState;
//         default: throw new Error('HTTP_REDUCER: Should not be reached!');
//     }
// };

// const useHttp = () => {
//     const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

//     const clear = useCallback(() => {
//         dispatchHttp({ type: 'CLEAR' });
//     }, []);

//     const sendHttpRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
//         dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
//         fetch(url, {
//             method: method,
//             body: body,
//             header: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => {
//                 return response.json();
//             })
//             .then(responseData => {
//                 dispatchHttp({
//                     type: 'RESPONSE',
//                     responseData: responseData,
//                     extra: reqExtra
//                 });
//             })
//             .catch(error => {
//                 dispatchHttp({
//                     type: 'ERROR',
//                     errorMessage: error.message
//                 });
//             });
//     }, []);

//     return [
//         httpState.loading,
//         httpState.data,
//         httpState.errorMessage,
//         sendHttpRequest,
//         httpState.extra,
//         httpState.identifier,
//         clear
//     ];
// };

// export default useHttp;