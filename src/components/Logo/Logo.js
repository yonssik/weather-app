import React from 'react';

import appIcon from '../../assets/logo/weather-app-logo.png';
import classes from './Logo.module.scss';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={appIcon} alt="Weather" />
    </div>
);

export default logo;