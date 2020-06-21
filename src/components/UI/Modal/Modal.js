import React from 'react';

import styles from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
    <>
        <Backdrop
            show={props.show}
            clicked={props.modalClosed} />
        <div
            className={styles.container}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            <span>ERROR: </span>
            <p>{props.children}</p>
        </div>
    </>
)

export default Modal;