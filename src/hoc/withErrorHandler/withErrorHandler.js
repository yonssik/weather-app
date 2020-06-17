import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(
            request => {
                setError(null);
                return request;
            }
        );
        const resInterceptor = axios.interceptors.response.use(
            response => response,
            error => setError(error)
        );
        useEffect(
            () => {
                return () => {
                    axios.interceptors.request.eject(
                        reqInterceptor
                    );
                    axios.interceptors.response.eject(
                        resInterceptor
                    );
                };
            }, [reqInterceptor, resInterceptor]);


        return (
            <>
                <Modal
                    show={error}
                    modalClosed={() => setError(null)}>
                    {error
                        ? error : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    }
};
export default withErrorHandler;