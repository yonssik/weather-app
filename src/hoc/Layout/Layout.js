import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Layout.module.scss';
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import backgroundImage from '../../assets/images/weather-changing.jpg';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const img = useSelector(state => state.currentCity.img);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <div className={styles.bgImg} style={{
            backgroundImage: `url(${img ? img : backgroundImage})`
        }}>
            <NavigationBar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                open={showSideDrawer}
                close={sideDrawerCloseHandler} />
            <div className={styles.container}>{props.children}</div>
        </div>
    );
}

export default Layout;