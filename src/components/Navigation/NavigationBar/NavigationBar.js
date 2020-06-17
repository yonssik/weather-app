import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './NavigationBar.module.css';

const NavigationBar = (props) => {
    return (
        <header className={styles.NavigationBar}>
            <h5>Weather-informant</h5>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default NavigationBar;