import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import WeatherInformant from './containers/WeatherInformant/WeatherInformant';
import FavoriteForecasts from './containers/FavoriteForecasts/FavoriteForecasts';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/home" component={WeatherInformant} />
        <Route path="/favorites" component={FavoriteForecasts} />
        <Redirect to="/home" />
      </Switch>
    </Layout>
  );
};

export default App;
