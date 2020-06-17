import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Layout.module.scss';
import NavigationBar from '../../components/Navigation/NavigationBar/NavigationBar';

const Layout = (props) => {
    const img = useSelector(state => state.currentCity.img);

    return (
        <div className={styles.bgImg} style={{
            backgroundImage: `url(${img ? img : "../../assets/images/weather-changing.jpg"})`
        }}>
            <NavigationBar />
            <div className={styles.container}>{props.children}</div>
        </div>
    );
}

export default Layout;