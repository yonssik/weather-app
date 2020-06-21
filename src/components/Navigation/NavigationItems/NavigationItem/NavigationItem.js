import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <NavLink to={props.link} activeClassName={styles.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;