import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from "./HOC/Layout";
import Home from "./Home";
import AuthCheck from "./HOC/AuthCheck";
import BookTrip from "./BookTrip";
import TripDetails from "./TripDetails";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={AuthCheck(Home)} />
                    <Route path="/book/new_trip" exact component={AuthCheck(BookTrip)} />
                    <Route path="/book/new_trip/:id/order" exact component={AuthCheck(TripDetails)} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;