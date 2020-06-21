import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styles from './NavigationBar.module.scss';

const NavigationBar = (props) => {
    return (
        <header className={styles.NavigationBar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo />
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default NavigationBar;