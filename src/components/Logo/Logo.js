import React from 'react';

import sunIcon from '../../assets/images/sun-icon-240.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={sunIcon} alt="Weather" />
    </div>
);

export default logo;