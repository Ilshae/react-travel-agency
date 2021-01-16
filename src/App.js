import React, { lazy, Suspense } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Spinner from './components/views/Spinner/Spinner';
import ErrorBoundary from './components/views/ErrorBoundary/ErrorBoundary';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';
import ScrollToTop from './utils/scrollToTop';

const Home = lazy(() => import( './components/views/Home/Home' ));
const Trips = lazy(() => import( './components/views/Trips/TripsContainer' ));
const Trip = lazy(() => import( './components/views/Trip/TripContainer' ));
const Countries = lazy(() => import( './components/views/Countries/CountriesContainer' ));
const Country = lazy(() => import( './components/views/Country/CountryContainer' ));
const Regions = lazy(() => import( './components/views/Regions/RegionsContainer' ));
const Info = lazy(() => import( './components/views/Info/Info' ));


class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips != this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  render(){
    return (
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout>
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Route exact path='/travel-agency/' component={Home} />
                <Route exact path='/travel-agency/trips' component={Trips} />
                <Route exact path='/travel-agency/trips/:id' component={Trip} />
                <Route exact path='/travel-agency/countries' component={Countries} />
                <Route exact path='/travel-agency/country/:id' component={Country} />
                <Route exact path='/travel-agency/regions' component={Regions} />
                <Route exact path='/travel-agency/info' component={Info} />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
