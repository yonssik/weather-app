import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/home" exact>Home</NavigationItem>
        <NavigationItem link="/favorites">Favorites</NavigationItem>
    </ul>
);

export default navigationItems;